import { NextFunction, Request, Response } from "express";
import { RouteRegistrar } from "../types";
import jwt from "jsonwebtoken";
import z from "zod";
import AuthProvider from "../AuthProvider";

const signatureKey = process.env.JWT_SECRET;
if (!signatureKey) {
  throw new Error("Missing JWT_SECRET from env file");
}

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
  next: NextFunction,
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

function verifyUsernameAndPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password } = z
    .object({
      username: z.string().optional(),
      password: z.string().optional(),
    })
    .parse(req.body);

  if (!username || !password) {
    res
      .status(400)
      .send({
        error: "Bad request",
        message: "Missing username or password",
      })
      .end();
  } else {
    res.locals.username = username;
    res.locals.password = password;
    next();
  }
}

export const registerAuthRoutes: RouteRegistrar = (
  app,
  mongoClientSupplier,
) => {
  app.use("/auth/*", verifyUsernameAndPassword);

  app.post("/auth/register", async (req, res) => {
    const { username, password } = res.locals;

    const mongoClient = await mongoClientSupplier();
    const authProvider = new AuthProvider(mongoClient);

    const { statusCode, response } = await authProvider.registerUser(
      username,
      password,
    );

    res
      .status(statusCode)
      .send(statusCode === 201 ? await generateAuthToken(username) : response);
  });

  app.post("/auth/login", async (req, res) => {
    const { username, password } = res.locals;

    const mongoClient = await mongoClientSupplier();
    const authProvider = new AuthProvider(mongoClient);

    const isValidPassword = await authProvider.verifyPassword(
      username,
      password,
    );

    if (isValidPassword) {
      const token = await generateAuthToken(username);
      res.status(200).send(token).end();
    } else {
      res.status(401).send({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }
  });
};
