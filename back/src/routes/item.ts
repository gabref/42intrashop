import { Router } from "express";
import { getItem, getItems, addItem, addItemOption, getItemHistory, removeItem, updateItem } from "../controllers/item";
import multer, { memoryStorage } from 'multer'

const router = Router();
const upload = multer({ storage: memoryStorage() });

router.get('/', getItems);
router.post('/', upload.single('image'), addItem);
router.delete('/:id', removeItem);
router.put('/:id', upload.single('image'), updateItem);
router.get('/:id', getItem);
router.get('/:id/history', getItemHistory);
router.post('/:id/options', addItemOption);

export { router };
