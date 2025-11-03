import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product-controller';

const router = express.Router();
router.get('/products', getProducts);
router.post('/create-product', createProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;