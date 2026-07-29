import { eq, and, gt } from "drizzle-orm";
import { users } from "./auth.model.js";
import { db } from "../../common/config/db.js";

export async function findByEmail(email) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user || null;
}

export async function findById(id) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return user || null;
}

export async function createUser({ name, email, password, role = "customer", verificationToken }) {
  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      password,
      role,
      verificationToken,
    })
    .returning();
  return user;
}

export async function findByVerificationToken(token) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.verificationToken, token))
    .limit(1);
  return user || null;
}

export async function verifyUser(userId) {
  await db
    .update(users)
    .set({
      isVerified: true,
      verificationToken: null,
    })
    .where(eq(users.id, userId));
}

export async function updateRefreshToken(userId, refreshToken) {
  await db
    .update(users)
    .set({
      refreshToken,
    })
    .where(eq(users.id, userId));
}

export async function setResetPasswordToken(userId, resetPasswordToken, resetPasswordExpires) {
  await db
    .update(users)
    .set({
      resetPasswordToken,
      resetPasswordExpires,
    })
    .where(eq(users.id, userId));
}

export async function findByResetToken(hashedToken) {
  const [user] = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.resetPasswordToken, hashedToken),
        gt(users.resetPasswordExpires, new Date())
      )
    )
    .limit(1);
  return user || null;
}

export async function updatePassword(userId, newPassword) {
  await db
    .update(users)
    .set({
      password: newPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    })
    .where(eq(users.id, userId));
}