import { CreateRentalController } from '@modules/rentals/use-cases/createRental/CreateRentalController';
import { ListRentalsByUserController } from '@modules/rentals/use-cases/listRentalsByUser/ListRentalsByUserController';
import { RentalReturnController } from '@modules/rentals/use-cases/rentalReturn/RentalReturnController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalReturnController = new RentalReturnController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  '/return/:id',
  ensureAuthenticated,
  rentalReturnController.handle
);

rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
