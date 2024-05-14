import { Router } from "express";
import { addItem, addItemOption, getItemHistory, removeItem, updateItem } from "../controllers/item";

const router = Router();

router.post('/', addItem);
router.delete('/:id', removeItem);
router.put('/:id', updateItem);
router.get('/:id/history', getItemHistory);
router.post('/:id/options', addItemOption);

export { router };
