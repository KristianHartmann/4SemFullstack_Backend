namespace Express {
  interface Request {
    requestTime?: string;
  }
}

interface Error {
  statusCode: number;
  status: string;
  isOperational?: boolean;
}

