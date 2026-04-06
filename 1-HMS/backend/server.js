import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./router/userRoute.js";
import doctorRouter from "./router/doctorRoute.js";
import adminRouter from "./router/adminRouter.js";

// app config
const app = express();
const port = process.env.PORT || 400;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
