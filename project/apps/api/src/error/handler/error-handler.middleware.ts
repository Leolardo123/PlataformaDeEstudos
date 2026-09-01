/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import AppError from '../AppError.error';

const logErrorMessageHelper = (error: Error | AppError): string => {
  if (error instanceof AppError) {
    return `AppError: ${error.message} (Status Code: ${error.statusCode})`;
  } else {
    return `Error: ${error.message}`;
  }
};

const parseZodErrorHelper = (error: any): string => {
  const type = error?.name;
  if (type === 'ZodError') {
    const issues = error?.issues;
    if (Array.isArray(issues)) {
      return issues.map((issue: any) => issue.message).join(', ');
    }
  }
  return '';
};

const responseErrorMessageHelper = (error: Error | AppError): string => {
  if (error instanceof AppError) {
    return error.message;
  } else if (error.name === 'ZodError') {
    return parseZodErrorHelper(error);
  } else {
    return 'Internal Server Error';
  }
};

const errorHandlerMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: () => void,
) => {
  console.error(err);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const status = err instanceof AppError ? err?.statusCode : 500;
  const timestamp = new Date().toISOString();
  const path = req.originalUrl || req.url;
  const logMessage = logErrorMessageHelper(err);
  const responseMessage = responseErrorMessageHelper(err);

  // Log the error to the console
  console.error(logMessage);

  // Send a generic error response to the client
  res.status(status).json({
    statusCode: status,
    timestamp,
    path,
    message: responseMessage,
  });
};

@Catch()
export class ErrorHandlerMiddleware implements ExceptionFilter {
  catch(exception: Error | AppError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const next = () => {};
    errorHandlerMiddleware(exception, request, response, next);
  }
}
