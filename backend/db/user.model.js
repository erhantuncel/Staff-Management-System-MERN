import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: mongoose.Schema.Types.String,
            required: [true, "User name is required."],
            maxLength: [10, "User name must be maximum 10 characters."],
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: [true, "Password is required."],
            minLength: [8, "Password must be at least 8 characters"],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
