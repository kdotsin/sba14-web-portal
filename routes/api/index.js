import e from "express";
import userRoutes from './userRoutes.js'
import bookmarkRoutes from './bookmarkRoutes.js'

const router = e.Router();

router.use('/users', userRoutes);
router.use('/bookmark', bookmarkRoutes);

export default router;