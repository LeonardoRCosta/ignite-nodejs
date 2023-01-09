import { ResetUserPasswordController } from '@modules/accounts/use-cases/resetUserPassword/ResetUserPasswordController';
import { SendForgotPasswordMailContoller } from '@modules/accounts/use-cases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotPasswordMailContoller = new SendForgotPasswordMailContoller();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordMailContoller.handle);
passwordRoutes.post('/reset', resetUserPasswordController.handle);

export { passwordRoutes };
