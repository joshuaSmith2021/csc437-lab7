import express, { NextFunction, Request, Response } from "express";
import { MongoClientBox } from "..";
import z from "zod";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { CredentialsProvider } from "../CredentialsProvider";

const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
  throw new Error("Missing JWT_SECRET from env file");
}

const getAuthProvider = (mongoClient: MongoClient) =>
  new CredentialsProvider(mongoClient);

function generateAuthToken(username: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { username: username },
      signatureKey!,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token as string);
      },
    );
  });
}

export function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction, // Call next() to run the next middleware or request handler
) {
  const authHeader = req.get("Authorization");
  // The header should say "Bearer <token string>".  Discard the Bearer part.
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).end();
  } else {
    // signatureKey already declared as a module-level variable
    jwt.verify(token, signatureKey!, (error, decoded) => {
      if (decoded) {
        res.locals.token = decoded as jwt.JwtPayload;
        next();
      } else {
        res.status(403).end();
      }
    });
  }
}

export const registerAuthRoutes = (
  app: express.Application,
  mongoClientBox: MongoClientBox,
) => {
  app.post("/auth/register", async (req: Request, res: Response) => {
    const { username, password } = z
      .object({
        username: z.string().optional(),
        password: z.string().optional(),
      })
      .parse(req.body);

    if (!username || !password) {
      res.status(400).send({
        error: "Bad request",
        message: "Missing username or password",
      });
      return;
    }

    const authProvider = getAuthProvider(mongoClientBox.mongoClient!);

    const { statusCode, response } = await authProvider.registerUser(
      username,
      password,
    );

    res
      .status(statusCode)
      .send(statusCode === 201 ? generateAuthToken(username) : response);
  });

  app.post("/auth/login", async (req: Request, res: Response) => {
    const { username, password } = z
      .object({
        username: z.string().optional(),
        password: z.string().optional(),
      })
      .parse(req.body);

    if (!username || !password) {
      res.status(400).send({
        error: "Bad request",
        message: "Missing username or password",
      });

      return;
    }

    const authProvider = getAuthProvider(mongoClientBox.mongoClient!);

    const authenticated = await authProvider.verifyPassword(username, password);

    if (authenticated) {
      const token = await generateAuthToken(username);
      res.status(200).send(token);
    } else {
      res.status(401).send({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }
  });
};
