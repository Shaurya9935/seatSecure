import nodemailer from "nodemailer";

// Lazy transporter — created on first use so env vars are guaranteed loaded
let _transporter = null;
const getTransporter = () => {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 2525,
      secure: false,           // must be false for port 2525
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return _transporter;
};

const sendEmail = async (to, subject, html) => {
  const transporter = getTransporter();
  const info = await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "SeatSecure"}" <${process.env.SMTP_FROM_EMAIL || "noreply@seatsecure.com"}>`,
    to,
    subject,
    html,
  });
  console.log(`[Email] Sent to ${to} | MsgId: ${info.messageId}`);
};

const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/verify-email/${token}`;
  await sendEmail(
    email,
    "✅ Verify your SeatSecure email",
    `
    <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#0f172a;color:#f0f4ff;border-radius:16px;">
      <h2 style="color:#10b981;margin-bottom:8px;">🎬 SeatSecure</h2>
      <h3 style="margin-bottom:16px;">Verify your email address</h3>
      <p style="color:#94a3b8;margin-bottom:24px;">Click the button below to verify your email and activate your account.</p>
      <a href="${url}" style="display:inline-block;padding:14px 28px;background:#10b981;color:#fff;border-radius:10px;text-decoration:none;font-weight:700;">Verify Email</a>
      <p style="color:#475569;font-size:12px;margin-top:24px;">Or copy this link: <a href="${url}" style="color:#22d3ee;">${url}</a></p>
      <p style="color:#475569;font-size:12px;">If you didn't create an account, you can safely ignore this email.</p>
    </div>
    `
  );
};

const sendResetPasswordEmail = async (email, token) => {
  const url = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await sendEmail(
    email,
    "🔑 Reset your SeatSecure password",
    `
    <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#0f172a;color:#f0f4ff;border-radius:16px;">
      <h2 style="color:#38bdf8;margin-bottom:8px;">🎬 SeatSecure</h2>
      <h3 style="margin-bottom:16px;">Reset your password</h3>
      <p style="color:#94a3b8;margin-bottom:24px;">Click the button below to set a new password. This link expires in 15 minutes.</p>
      <a href="${url}" style="display:inline-block;padding:14px 28px;background:#38bdf8;color:#0f172a;border-radius:10px;text-decoration:none;font-weight:700;">Reset Password</a>
      <p style="color:#475569;font-size:12px;margin-top:24px;">Or copy this link: <a href="${url}" style="color:#22d3ee;">${url}</a></p>
      <p style="color:#475569;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
    </div>
    `
  );
};

export {
  sendVerificationEmail,
  sendResetPasswordEmail,
}