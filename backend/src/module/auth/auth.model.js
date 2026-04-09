import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        required: [true, "Name is required"]
    },

    email: {
       type: String,
       trim: true,
       required: [true, "email is required"],
       lowercase: true,
       unique: true 
    },

    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8,
        select: false,
    },
    
    role: {
        type: String,
        enum : ["customer", "admin"],
        default: "customer"
    },

    isVerified: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema)