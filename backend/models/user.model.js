import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
    },

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next()
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
    next()
})

const User = mongoose.model("User", userSchema)
export default User