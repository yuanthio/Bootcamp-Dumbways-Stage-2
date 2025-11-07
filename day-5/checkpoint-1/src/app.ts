import express from "express";

import authRoute from "./routes/auth";

const app = express();
app.use(express.json());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
