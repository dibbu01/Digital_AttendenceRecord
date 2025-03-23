import mongoose from "mongoose";

const adminuserschema = mongoose.Schema(
    {
        adminuserid:{
            type:String,
            required:true,
            unique:true
        },
        adminpassword:{
            type:String,
            required:true,
            unique:true
        }
    }
)

const adminuser = mongoose.model("adminUser",adminuserschema)
export default adminuser;