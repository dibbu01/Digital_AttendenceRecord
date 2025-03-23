import mongoose from "mongoose";
//user defined here as staff 
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        subjectcode: 
            {
                type: String,
                ref: "User",
                default: "",
            },
        subjectname: 
            {
                type:String, // Fixed the typo here
                ref: "User",
                default: "",
            },
    },
    { timestamps: true } // Add timestamps for createdAt and updatedAt
);

const User = mongoose.model("User", userSchema);
export default User;
