import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import './database';
import './shared/container';
import swaggerFile from './swagger.json';
import { router } from './routes';
import { AppError } from './errors/AppError';

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

app.listen(3333, () => console.log('Server running! http://localhost:3333'));
