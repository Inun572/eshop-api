import { NextFunction, Request, Response } from 'express';
import { findUser } from '../services/userServices';
import bcrypt from 'bcrypt';

export const validateLoginRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorMsg = '';
  const { username, email, password } = req.body;
  if (!email && !username) {
    errorMsg += 'Email or username is required';
  }
  if (!password) {
    errorMsg += 'Password is required';
  }

  if (errorMsg !== '') {
    return res.status(400).json({
      message: errorMsg,
    });
  }

  if (/^\S+@\S+\.\S+$/.test(email) === false) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // if (
  //   /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(
  //     password
  //   ) === false
  // ) {
  //   return res.status(400).json({
  //     message:
  //       'Password must be at least 8 characters long and contain at least one uppercase letter and one lowercase letter',
  //   });
  // }

  const user = await findUser(email);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Password incorrect' });
  }

  req.user = {
    id: user.id,
    username: user.username,
    email: user.email,
    is_active: user.is_active,
    role_id: user.role_id,
  };

  next();
};
