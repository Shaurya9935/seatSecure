import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./module/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.all("{*path}", (req, res) =>{
    throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

export default app;