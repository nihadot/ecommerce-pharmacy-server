import { Router } from "express";
import { create,getById,getAll,deleteById } from "../controller/BannertwoController.js";

const router = Router()

router.post('/', create);
router.get('/',getAll);
router.get('/:id',getById);
router.delete('/:id',deleteById);

 export default router;