import express from "express";
import image from '../utils/image.js'
import { index, create, store, edit, destroy, update } from '../controllers/galleryController.js'
const router = express.Router()

router.get('/gallery', index)
router.get('/gallery/create', create)
router.post('/gallery/store', image.single('image'), store)
router.post('/gallery/update/:id', image.single('image'), update)
router.get('/gallery/edit/:id', edit)
router.post('/gallery/destroy/:id', destroy)


export default router;