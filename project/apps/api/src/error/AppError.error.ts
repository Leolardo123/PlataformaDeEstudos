import HttpStatusCodes from './HttpStatusCodes.error';

class AppError extends Error {
  public readonly statusCode: number;
  constructor(
    public readonly message: string,
    public readonly statusName: keyof typeof HttpStatusCodes,
  ) {
    super(message);
    this.statusCode = HttpStatusCodes[statusName];
  }
}

export default AppError;
