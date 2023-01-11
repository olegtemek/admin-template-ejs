import express from "express";
import { index, error } from '../controllers/homeController.js'
const router = express.Router()

router.get('/', index)
router.get('/error', error)


export default router;