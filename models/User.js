const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, reuqired: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: {  type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        createdAt
    },
    { timestamps: true}
);

module.exports = mongoose.model("User", userSchema);