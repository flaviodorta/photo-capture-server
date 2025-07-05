import { Router } from 'express';
import * as ImageController from '../controllers/image.controller';
import multer from 'multer';

const router = Router();

const upload = multer();

router.get('/panel', ImageController.getPanelData);
router.post('/upload', upload.single('image'), ImageController.uploadImage);
router.get('/image/:id', ImageController.getImageById);

export default router;
