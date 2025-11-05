import express from "express";
import routerProducts from "./routes/product";
import routerOrders from "./routes/order";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/v1', routerProducts);
app.use('/api/v1', routerOrders);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});