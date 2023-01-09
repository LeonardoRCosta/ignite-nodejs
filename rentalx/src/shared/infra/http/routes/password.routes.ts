import { SendForgotPasswordMailContoller } from '@modules/accounts/use-cases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

const sendForgotPasswordMailContoller = new SendForgotPasswordMailContoller();

passwordRoutes.post('/forgot', sendForgotPasswordMailContoller.handle);

export { passwordRoutes };
