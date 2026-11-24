import e from "express";
import apiRoutes from './api/index.js';

const router = e.Router();

router.use('/api', apiRoutes);

export default router