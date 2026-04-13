import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./module/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";
import bookingRoutes from "./module/booking/booking.route.js";
import * as authService from "./module/auth/auth.service.js";

const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/booking", bookingRoutes);

// Redirect password reset links from email to frontend reset page
app.get("/reset-password/:token", (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const token = encodeURIComponent(req.params.token);
    res.redirect(`${frontendUrl}/reset-password.html?token=${token}`);
});

// Redirect email verification link to API endpoint
app.get("/verify-email/:token", async (req, res, next) => {
    try {
        await authService.verifyEmail(req.params.token);
        res.json({success: true, message: "Email verified successfully"});
    } catch (err) {
        next(err);
    }
});

app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

app.use((err, req, res, next) => {
    const statusCode = err?.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err?.message || "Internal server error",
    });
});

export default app;