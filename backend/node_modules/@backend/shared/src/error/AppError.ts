export class AppError extends Error {
    readonly statusCode: number;
    readonly status: "fail" | "error";
    readonly isOperational = true;

    constructor(message: string, statusCode = 500) {
        super(message);

        if (!Number.isInteger(statusCode) || statusCode < 400 || statusCode > 599) {
            throw new RangeError("AppError statusCode must be an integer between 400 and 599");
        }

        this.name = new.target.name;
        this.statusCode = statusCode;
        this.status = statusCode < 500 ? "fail" : "error";

        Error.captureStackTrace?.(this, this.constructor);
    }
}