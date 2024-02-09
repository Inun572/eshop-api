import { Router } from 'express';
import { login } from '../controller/authController';
import { validateLoginRequest } from '../validator/loginValidator';

const router = Router();

router.post('/login', validateLoginRequest, login);

export default router;
