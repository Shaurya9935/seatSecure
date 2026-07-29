import { eq } from "drizzle-orm";
import { users } from "./auth.model.js";

export async function findByEmail(email){
    return db.query.users.findFirst({
        where: eq(users.email, email)
    })
}

export async function createUser(name, email, password, verification_token) {
    const [user] = await db
    .insert(users)
    .values({
        name,
        email,
        password,
        verification_token
    })
    .returning();
}

export async function findById(id){
    return db.query.users.findFirst({
        where: eq(users.id, id)
    })
}

export async function findByVerificationToken(token) {

  return db.query.users.findFirst({

    where: eq(users.verificationToken, token),

  });

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