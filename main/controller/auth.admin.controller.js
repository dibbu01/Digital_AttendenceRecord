import bcrypt, { genSalt } from "bcryptjs";
import adminuser from "../model/auth.admin.login.model.js";
import generatetoken from '../utils/generatetoken.js';


export const adminlogin=async(req,res)=>{

    const {adminuserid,adminpassword}=req.body;
    console.log(adminuserid)
    if(!adminuserid || !adminpassword){
        return res.status(400).json({ error: "All fields are required" });   
    }
    const user = await adminuser.find({adminuserid:adminuserid});
    console.log(user)
    if(user.length==0){
        return res.status(400).json({error:"No user found"})
    }
    generatetoken(user._id,res)
    res.status(200).json("user found")
};

export const adminlogout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({"message":"Logout successfully"});
    } catch (error) {
        console.log("The error occurs")
        res.status(500).json({error:"The Fucking error occurs"})
    }
};


export const adminsignup = async (req, res) => {
    try {
        const { adminuserid, adminpassword } = req.body;

        // Check if user already exists
        const existingUser = await adminuser.findOne({ adminuserid });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminpassword, salt);

 
        const newadminuser = new adminuser({
            adminuserid,
            adminpassword: hashedPassword,
        });

        // Save to database
        await newadminuser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newadminuser._id,
                adminuserid: newadminuser.adminuserid,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

