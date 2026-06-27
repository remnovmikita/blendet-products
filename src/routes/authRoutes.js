import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
} from '../validation/authValidation.js';
import { loginUser, logoutUser, refreshUserSession, registerUser, requestResetEmail } from '../controlles/authControlles.js';

const authRoutes = Router();

authRoutes.post(
  '/auth/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);

authRoutes.post('/auth/logout', logoutUser);

authRoutes.post("/auth/refresh", refreshUserSession);

authRoutes.post(
  '/auth/login',
  celebrate(loginUserSchema, { abortEarly: false }),
  loginUser,
);

authRoutes.post("/auth/request-reset-email", celebrate(requestResetEmailSchema), requestResetEmail);

export default authRoutes;
