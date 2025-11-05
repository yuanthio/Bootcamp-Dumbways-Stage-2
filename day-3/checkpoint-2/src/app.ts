import express from "express";
import routerPosts from "./routes/post";
import routerUsers from "./routes/user";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/v1', routerPosts);
app.use('/api/v1', routerUsers);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

