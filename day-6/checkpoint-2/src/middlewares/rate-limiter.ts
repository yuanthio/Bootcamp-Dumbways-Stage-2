import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  limit: 5, 
  message: "Terlalu banyak request, coba lagi dalam beberapa saat."
});

export default limiter;
