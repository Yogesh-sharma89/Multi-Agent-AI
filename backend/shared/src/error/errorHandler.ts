import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "./AppError.js";

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message  = "Internal server error";
    let status = "error";
    let isOperational = true;

    if(err instanceof AppError){
        statusCode = err.statusCode;
        message  = err.message;
        status:err.status;
        isOperational:err.isOperational
    }

    console.log(err);

    return res.status(statusCode).json({
        success:false,
        status,
        message,
        isOperational,
        ...(process.env.NODE_ENV==="production" ? {}:{stack:err.stack})
    })

}