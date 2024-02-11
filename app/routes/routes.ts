import { Router } from 'express';
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';
import categoryRoutes from '../routes/categoryRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);

export default router;
