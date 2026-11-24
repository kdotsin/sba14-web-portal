import e from "express";
import userRoutes from './userRoutes.js'

const router = e.Router();

router.use('/api', userRoutes);

export default router;