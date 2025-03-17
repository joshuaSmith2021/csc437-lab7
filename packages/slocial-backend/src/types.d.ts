import express from "express";
import { MongoClient } from "mongodb";

export type RouteRegistrar = (
  app: express.Application,
  mongoClientProvider: () => Promise<MongoClient>,
) => void;

export interface ApiResponse {
  statusCode: number;
  response?: { message: string; error: string };
}
