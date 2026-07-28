// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         trim: true,
//         minlength: 2,
//         maxlength: 50,
//         required: [true, "Name is required"]
//     },

//     email: {
//        type: String,
//        trim: true,
//        required: [true, "email is required"],
//        lowercase: true,
//        unique: true 
//     },

//     password: {
//         type: String,
//         required: [true, "password is required"],
//         minlength: 8,
//         select: false,
//     },
    
//     role: {
//         type: String,
//         enum : ["customer", "admin"],
//         default: "customer"
//     },

//     isVerified: {
//         type: Boolean,
//         default: false
//     },

//     verificationToken: {
//         type: String,
//         select: false
//     },

//     refreshToken: {
//         type: String,
//         select: false
//     },

//     resetPasswordToken: {
//         type: String,
//         select: false
//     },

//     resetPasswordExpires: {
//         type: Date,
//         select: false
//     }
// }, {timestamps: true})

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 12);
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model("User", userSchema)



import { timestamp, text } from "drizzle-orm/mysql-core";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const userSchema = pgTable("users",{
    id: uuid('id').primaryKey().defaultRandom(),

    name: varchar('name', {length: 80}).notNull(),

    email: varchar('email', {length: 255}).notNull(),
    emailVerified: boolean('email_verified').default(false),

    verificationToken: text('verificantion_token'),
    refreshToken: text('refresh_token'),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(()=> new Date())

})