import express from 'express';
import { getOrders, createOrder, deleteOrder } from '../controllers/order-controller';

const router = express.Router();

router.get('/orders', getOrders);
router.post('/create-order', createOrder);
router.delete('/delete-order/:id', deleteOrder);

export default router;