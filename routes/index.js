import e from "express";
import apiRoutes from './api/index.js';

const router = e.Router();

router.use('/', apiRoutes);

export default router