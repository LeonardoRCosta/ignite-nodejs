import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/use-cases/createUser/CreateUserController';
import { ProfileUserController } from '@modules/accounts/use-cases/profileUser/ProfileUserController';
import { UpdateUserAvatarController } from '@modules/accounts/use-cases/updateUserAvatar/UpdateUserAvatarControler';
import { Router } from 'express';
import multer from 'multer';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
