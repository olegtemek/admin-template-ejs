import express from "express";
import { index, login } from '../controllers/authController.js'
const router = express.Router()

router.get('/auth', index)
router.post('/auth', login)


export default router;