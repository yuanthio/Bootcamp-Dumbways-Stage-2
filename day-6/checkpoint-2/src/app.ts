import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import corsMiddleware from "./middlewares/cors";
import limiter from "./middlewares/rate-limiter";
import cookieParser from "cookie-parser"; 

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
