import express from 'express';
import { getAllUsers } from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize(['ADMIN']));

// Minimal admin routes
router.get('/users', getAllUsers);

export default router;