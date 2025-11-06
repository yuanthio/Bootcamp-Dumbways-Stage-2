import { Request, Response, NextFunction } from "express";
import { StockError } from "../errors/StockError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("[ERROR]:", err);

  if (err instanceof StockError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({
    message: "Internal server error",
    error: err.message
  });
}
