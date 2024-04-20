import express,{Router} from "express";
import { register, login,getAdmin,getAllAdmin ,updateAdminProfile } from "../controller/adminController.js";
import { AdminTockenVerify} from "../middleware/AdminTockenVerify.js";


const router = Router()

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id',AdminTockenVerify, getAdmin);
router.get('/',AdminTockenVerify, getAllAdmin);
router.put('/profile', AdminTockenVerify, updateAdminProfile);
// router.put('/:id', getAdmin);

export default router;