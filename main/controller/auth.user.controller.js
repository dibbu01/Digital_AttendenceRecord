import User from "../model/auth.model.js";
import bcrypt, { genSalt } from "bcryptjs";
import generatetoken from "../utils/generatetoken.js";



export const signup = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;
        
        if (!username || !fullname || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if (existingEmail || existingUsername) {
            return res.status(400).json({ error: "Email or username already exists" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ error: "Password must be at least 6 characters long" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            fullname,
            email,
            password: hashedPassword,
        });
       // generatetoken(newUser._id,res)
        await newUser.save();

        res.status(200).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                fullname: newUser.fullname,
                email: newUser.email
            },
        });
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        
        generatetoken(user._id,res)

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const userlogout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({"message":"Logout successfully"});
    } catch (error) {
        console.log("The error occurs")
        res.status(500).json({error:"The Fucking error occurs"})
    }
};