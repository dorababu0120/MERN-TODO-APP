import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";
import personalTaskRoutes from "./routes/personalTaskRoutes.js";

dotenv.config();
dbConnection();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001","https://spact-task-management-app.netlify.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Routes
app.use("/api/personal-tasks", personalTaskRoutes);
app.use("/api", routes);

// Error handling
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
