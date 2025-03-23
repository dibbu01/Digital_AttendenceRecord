import jwt from "jsonwebtoken";
import adminuser from "../model/auth.admin.login.model.js";
//import User from "../model/user.login.model.js";

const protectroute =async(req,res,next)=>{

    const token = req.cookies.jwt
    if (!token){
        return res.status(500).json({error:"Token Error"})
    }

    const decoded = jwt.verify(token,process.env.secret_code)
    if(!decoded){
        return res.status(500).json({error:"Decode Error"})
    }

    const user = await adminuser.findOne({_id:decoded.user_id}).select("-password")
    if(!user){
        return res.status(500).json({error:"User not found"})
    }
     
    req.user=user
    next();
}
export default protectroute;