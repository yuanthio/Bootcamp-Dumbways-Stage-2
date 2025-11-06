import express from "express";
import router from "./routes/transfer-point";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((err:any, req:any, res:any, next:any) => {
    console.log(err);
    res.status(err.status || 500).json({error:err.message || "Internal sever error"});
});
app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});