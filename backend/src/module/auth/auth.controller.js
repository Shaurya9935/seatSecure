import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
  const user = await authService.register(req.body);
  ApiResponse.created(res, "registration successfull", user);
};

const login = async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.ok(res, "logged in", { user, accessToken });
};

const refreshToken = async(req, res) => {
    const token = req.cookies?.refreshToken;
    const { accessToken } = await authService.refresh(token);
    ApiResponse.ok(res, "Token refreshed", {accessToken});
};

const logout = async(req, res) => {
    await authService.logout(req.user.id);
    res.clearCookie("refreshToken");
    ApiResponse.ok(res, "Logged Out Successfully");
};
const verifyEmail = async(req, res) =>{
    await authService.verifyEmail(req.params.token);
    ApiResponse.ok(res, "Email verified Successfully");
}

const forgotPassword = async(req, res) => {
    await authService.forgotPassword(req.body.email);
    ApiResponse.ok(res, "Password reset email sent");
}

const resetPassword = async(req, res) => {
    await authService.resetPassword(req.params.token, req.body.password);
    ApiResponse.ok(res, "Password changed Successfully");
}

const getMe = async(req, res) =>{
    const user = await authService.getMe(req.user.id);
    ApiResponse.ok(res, "User Profile", user);
}

export { register, login, refreshToken, logout, verifyEmail, forgotPassword, resetPassword, getMe };
