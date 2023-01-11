import express from "express";
import { index, create, store, update, destroy, edit } from '../controllers/categoryController.js'
const router = express.Router()

router.get('/category', index)
router.get('/category/create', create)
router.post('/category/store', store)
router.get('/category/edit/:id', edit)
router.post('/category/update/:id', update)
router.post('/category/destroy/:id', destroy)


export default router;