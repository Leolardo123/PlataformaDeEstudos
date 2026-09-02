import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodError, type ZodIssue } from 'zod';
import AppError from '../AppError.error';
import {
  formatZodError,
  formatZodIssues,
} from '../../common/zod-error-formatter';

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const isZodIssueList = (value: unknown): value is ZodIssue[] => {
  return (
    Array.isArray(value) &&
    value.every((item) => isRecord(item) && typeof item.code === 'string')
  );
};

const logErrorMessageHelper = (error: Error | AppError): string => {
  if (error instanceof AppError) {
    return `AppError: ${error.message} (Status Code: ${error.statusCode})`;
  } else {
    return `Error: ${error.message}`;
  }
};

const parseZodErrorHelper = (error: unknown): string => {
  if (error instanceof ZodError) {
    return formatZodError(error).join(', ');
  }

  if (
    isRecord(error) &&
    error.name === 'ZodError' &&
    isZodIssueList(error.issues)
  ) {
    return formatZodIssues(error.issues).join(', ');
  }

  return '';
};

const parseHttpExceptionMessage = (error: HttpException): string => {
  const response = error.getResponse();

  if (typeof response === 'string') return response;

  if (response && typeof response === 'object') {
    const payload = response as {
      message?: string | string[];
      issues?: unknown;
    };
    if (Array.isArray(payload.message)) return payload.message.join(', ');
    if (typeof payload.message === 'string') return payload.message;
    if (isZodIssueList(payload.issues)) {
      return formatZodIssues(payload.issues).join(', ');
    }
  }

  return error.message;
};

const responseErrorMessageHelper = (error: Error | AppError): string => {
  if (error instanceof AppError) {
    return error.message;
  } else if (error instanceof HttpException) {
    return parseHttpExceptionMessage(error);
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
) => {
  console.error(err);

  const status =
    err instanceof AppError
      ? err.statusCode
      : err instanceof HttpException
        ? err.getStatus()
        : 500;
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
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    errorHandlerMiddleware(exception, request, response);
  }
}
