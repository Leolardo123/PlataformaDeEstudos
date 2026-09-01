import StatusCodes from './StatusCodes.error';

class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: StatusCodes,
  ) {
    super(message);
  }
}

export default AppError;
