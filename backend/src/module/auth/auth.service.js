import crypto from "crypto"
import User from "./auth.model.js"
import ApiError from "../../common/utils/api-error.js"
import { 
    generateAccessToken,
    generateRefreshToken, 
    generateResetToken, 
    verifyRefreshToken 
} from "../../common/utils/jwt-util.js"
import { sendVerificationEmail, sendResetPasswordEmail,} from "../../common/config/email.js";

const hashToken = (token) => {
    crypto.createHash("sha256").update(token).digest("hex");
}

const register = async({name, email, password, role}) => {

    const existing = await User.findOne({email});

    if(existing) throw ApiError.conflict("User Already exists");

    const {rawToken, hashedToken} = generateResetToken()

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    // TODO : send an email to user with token : rawtoken
    try {
    await sendVerificationEmail(email, rawToken);
  } catch (err) {
    console.error("Failed to send verification email:", err.message);
  }

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.verificationToken
    
    return userObj;
}


const login = async({email, password}) => {

    const user = await User.findOne({email}).select("+password");
    if(!user) throw ApiError.unauthorized("Invalid email or password")

    const isMatch = await user.comparePassword(password)
    if(!isMatch) throw ApiError.unauthorized("Invalid Password")

    if(!user.isVerified){
        throw ApiError.forbidden("Please Verify email before login")
    }

    const accessToken = generateAccessToken({id:user._id, role: user.role})
    const refreshToken = generateRefreshToken({id:user._id})

    user.refreshToken = hashToken(refreshToken)
    await user.save({validateBeforeSave: false})

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return {user: userObj, accessToken, refreshToken}
}

const refresh = async(token) => {
    if(!token) throw ApiError.unauthorized("Refrsh token missing");

    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.id).select("+refreshToken");
    if(!user) throw ApiError.unauthorized("User no longer exists");

    if(user.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token - please login in again");
    }

    const accessToken = generateAccessToken({id: user._id, role: user.role});
    
    return { accessToken };
}

const logout = async(userId) => {
    await User.findByIdAndUpdate(userId, {refreshToken: null});
};

const verifyEmail = async(token) => {
    const trimmed = String(token).trim();
    if(!trimmed) throw ApiError.badRequest("Invalid or expired verification token");

    const hashedInput = hashToken(trimmed);
    let user = await User.findOne({verificationToken: hashedInput}).select("+verificationToken");
    if(!user) {
        user = await User.findOne({verificationToken: trimmed}).select("+verificationToken");
    }

    if(!user) throw ApiError.badRequest("Invalid or expired verification token")
    
    await User.findByIdAndUpdate(user._id,{
        $set: {isVerified: true},
        $unset: {verificationToken: 1}
    });

    return user;
}

const forgotPassword = async(email) => {
    const user = await User.findOne({email});
    if(!user) throw ApiError.notFound("User not found");

    const {rawToken, hashedToken} = generateResetToken();

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    try {
        await sendResetPasswordEmail(email, rawToken);
    } catch (err) {
        console.error("failed to send email", err.message);
    }
};

const resetPassword = async(token, newPassword) => {
    const hashedToken = hashToken(token);

    const user = User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {$gt: Date.now()}
    }).select("+resetPasswordToken +resetPasswordExpires");

    if(!user) throw ApiError.badRequest("Invalid or Expired reset token");

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
};

const getMe = async(userId) => {
    const user = await User.findById(userId);
    if(!user) throw ApiError.notFound("User not found");
    return user;
}





export {register, login, refresh, logout, verifyEmail, forgotPassword, resetPassword};
