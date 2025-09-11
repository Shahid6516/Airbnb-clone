import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(cookieParser())

//Routes
app.use("/api/auth", authRouter)



app.listen(PORT, () => {
  connectDb();
  console.log("Your app is runing on Port:", PORT);
});
