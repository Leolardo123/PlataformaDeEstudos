import HttpStatusCodes from './HttpStatusCodes.error';

class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: HttpStatusCodes,
  ) {
    super(message);
  }
}

export default AppError;
