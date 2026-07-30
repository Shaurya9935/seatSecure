import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./module/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";
import bookingRoutes from "./module/booking/booking.route.js";
import * as authService from "./module/auth/auth.service.js";
import movieRoutes from "./module/movie/movie.routes.js";
import adminRoutes from "./module/admin/admin.routes.js";

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
app.use("/api/movies", movieRoutes);
app.use("/admin", adminRoutes);
app.use("/api/admin", adminRoutes);

// Redirect password reset links from email to React frontend
app.get("/reset-password/:token", (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const token = encodeURIComponent(req.params.token);
    res.redirect(`${frontendUrl}/reset-password?token=${token}`);
});

// Handle email verification link — verify token and redirect to frontend
app.get("/verify-email/:token", async (req, res, next) => {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const token = encodeURIComponent(req.params.token);
    try {
        await authService.verifyEmail(req.params.token);
        // Redirect to frontend success page
        res.redirect(`${frontendUrl}/verify-email?verified=true`);
    } catch (err) {
        // Redirect to frontend error page with message
        const msg = encodeURIComponent(err?.message || "Verification failed");
        res.redirect(`${frontendUrl}/verify-email?error=${msg}`);
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