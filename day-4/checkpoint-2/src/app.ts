import express from "express";
import updateStockFromSuppliers from "./routes/stock";
import {errorHandler} from "./middleware/errorHandler"

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/v1', updateStockFromSuppliers);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});