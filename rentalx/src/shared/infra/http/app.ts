import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';

import createConnection from '@shared/infra/typeorm';
import '@shared/container';
import swaggerFile from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

createConnection();
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal Server Error: ${error.message}`,
  });

  next();
});

export { app };
