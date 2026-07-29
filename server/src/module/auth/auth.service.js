import crypto from "crypto";
import bcrypt from "bcrypt";
import ApiError from "../../common/utils/api-error.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyRefreshToken,
} from "../../common/utils/jwt-util.js";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../../common/config/email.js";
import {
  createUser,
  findByEmail,
  findById,
  findByVerificationToken,
  verifyUser,
  updateRefreshToken,
  setResetPasswordToken,
  findByResetToken,
  updatePassword,
} from "./auth.repository.js";

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const register = async ({ name, email, password, role }) => {
  const existing = await findByEmail(email);
  if (existing) throw ApiError.conflict("User Already exists");

  const { rawToken, hashedToken } = generateResetToken();
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    role,
    verificationToken: hashedToken,
  });

  try {
    await sendVerificationEmail(email, rawToken);
  } catch (err) {
    console.error("Failed to send verification email:", err.message);
  }

  const { password: _, verificationToken: __, ...safeUser } = user;
  return safeUser;
};

const login = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) throw ApiError.unauthorized("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw ApiError.unauthorized("Invalid Password");

  if (!user.isVerified) {
    throw ApiError.forbidden("Please Verify email before login");
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id });

  await updateRefreshToken(user.id, hashToken(refreshToken));

  const {
    password: _,
    refreshToken: __,
    verificationToken: ___,
    resetPasswordToken: ____,
    resetPasswordExpires: _____,
    ...userObj
  } = user;

  return { user: userObj, accessToken, refreshToken };
};

const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("Refresh token missing");

  const decoded = verifyRefreshToken(token);

  const user = await findById(decoded.id);
  if (!user) throw ApiError.unauthorized("User no longer exists");

  if (user.refreshToken !== hashToken(token)) {
    throw ApiError.unauthorized("Invalid refresh token - please login in again");
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });

  return { accessToken };
};

const logout = async (userId) => {
  await updateRefreshToken(userId, null);
};

const verifyEmail = async (token) => {
  const trimmed = String(token).trim();
  if (!trimmed) throw ApiError.badRequest("Invalid or expired verification token");

  const hashedInput = hashToken(trimmed);
  let user = await findByVerificationToken(hashedInput);

  if (!user) {
    user = await findByVerificationToken(trimmed);
  }

  if (!user) throw ApiError.badRequest("Invalid or expired verification token");

  await verifyUser(user.id);

  const { password: _, verificationToken: __, refreshToken: ___, ...safeUser } = user;
  return safeUser;
};

const forgotPassword = async (email) => {
  const user = await findByEmail(email);
  if (!user) throw ApiError.notFound("User not found");

  const { rawToken, hashedToken } = generateResetToken();
  const resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

  await setResetPasswordToken(user.id, hashedToken, resetPasswordExpires);

  try {
    await sendResetPasswordEmail(email, rawToken);
  } catch (err) {
    console.error("failed to send email", err.message);
  }
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = hashToken(token);

  const user = await findByResetToken(hashedToken);
  if (!user) throw ApiError.badRequest("Invalid or Expired reset token");

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await updatePassword(user.id, hashedPassword);
};

const getMe = async (userId) => {
  const user = await findById(userId);
  if (!user) throw ApiError.notFound("User not found");
  const { password: _, verificationToken: __, refreshToken: ___, ...safeUser } = user;
  return safeUser;
};

export {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
};
