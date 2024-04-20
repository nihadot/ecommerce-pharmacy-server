import { Router } from "express"
import { createCategory, deleteCategoryById, getCategory, getCategoryById, updateCategoryById } from "../controller/CategoryController.js"

const router = Router()

router.post('/', createCategory);
router.get('/', getCategory);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);

export default router;