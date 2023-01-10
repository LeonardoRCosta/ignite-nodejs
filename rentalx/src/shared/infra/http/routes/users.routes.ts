import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/use-cases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/use-cases/updateUserAvatar/UpdateUserAvatarControler';
import { Router } from 'express';
import multer from 'multer';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRoutes };
