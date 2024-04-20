import express, { Router } from "express";
import { createOrder,getOrders} from "../controller/OrderController.js";
 

const router = Router()

router.post('/', createOrder);
router.get('/', getOrders);
// router.post('/payment', payment);
// // router.get('/user/:id', getOrdersByUserId);
// // router.get('/getorders/:id', getOrders);
// router.post('/approved/:id', orderApproved);
// router.post('/pending/:id', orderPending);
// router.post('/shipped/:id', orderShipped);
// router.post('/delivered/:id', orderDelivered);
// router.get('/:id', getById);

export default router;
