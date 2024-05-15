import { Router } from "express";
import { getItems, addItem, addItemOption, getItemHistory, removeItem, updateItem } from "../controllers/item";

const router = Router();

router.get('/', getItems);
router.post('/', addItem);
router.delete('/:id', removeItem);
router.put('/:id', updateItem);
router.get('/:id/history', getItemHistory);
router.post('/:id/options', addItemOption);

export { router };
