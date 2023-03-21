class AppError extends Error {
  public isOperational: boolean;
  public status: string;

  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
