import { Router } from 'express';
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';
import categoryRoutes from '../routes/categoryRoutes';
import productRoutes from '../routes/productRoutes';
import cartRoutes from '../routes/cartRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

export default router;
