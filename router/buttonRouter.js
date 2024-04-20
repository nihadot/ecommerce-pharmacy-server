import { Router } from "express"
import { createButton, getButton ,getButtonById,updateButtonById,deleteButtonById} from "../controller/ButtonController.js";

const router = Router()

router.post('/', createButton);
router.get('/', getButton);
router.get('/:id', getButtonById);
router.put('/:id', updateButtonById);
router.delete('/:id', deleteButtonById);

export default router;