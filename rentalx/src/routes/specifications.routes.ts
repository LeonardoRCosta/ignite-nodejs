import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/use-cases/createSpecification/CreateSpecifcationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
