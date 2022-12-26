import { CreateUserController } from '@modules/accounts/use-cases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/use-cases/updateUserAvatar/UpdateUserAvatarControler';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

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
