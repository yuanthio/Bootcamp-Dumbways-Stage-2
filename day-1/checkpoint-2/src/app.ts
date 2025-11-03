import express from 'express';
import productRouter from './routes/product-route';
import orderRouter from './routes/order-route';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/v1', productRouter);
app.use('/api/v1', orderRouter);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});