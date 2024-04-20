import express, { Router } from "express";
import { register, login,getAllUsers,getUser} from "../controller/UserController.js";
// import { addToCart, listCart } from "../controller/orderController.js";
// import { UserTockenVerify} from "../middleware/UserTockenVerify.js";


const router = Router()

router.post('/register', register);
router.post('/login', login);
 router.get('/', getAllUsers);
 router.get('/:id',getUser)
//  router.get('/profile/:id', verifyUserToken, getById);
// router.get('/', verifyUserToken, getAll);
// router.put('/profile', update);
// router.get('/transactions', getTransactions);
// router.post('/addtocart',addToCart)
// router.get('/listCart',listCart)


export default router;