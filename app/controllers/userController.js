import usersModel from "../models/usersModel.js";
import {EncodeToken} from "../utility/tokenUtility.js";

// Registration
export const Registration = async (req, res) => {
    try {
        let reqBody = req.body;
        await usersModel.create(reqBody);
        return res.json({status: "success", Message: "User Registered Successfully"});
    }
    catch(err){
        return res.json({status:"Fail", Message: err.toString()});
    }
}

// Login
export const Login = async (req, res) => {
    try{
        let reqBody = req.body;
        let data = await usersModel.findOne(reqBody);
        if(data===null){
            return res.json({status:"failed", Message: "User not found"});
        }
        else{
            let token = EncodeToken(data["phoneNumber"], data["_id"]);
            return res.json({status:"Success", Token: token, Message: "User Login successfully"});
        }
    }
    catch(err){
        return res.json({status:"Fail", Message: err.toString()});
    }
}

// One Profile Read
export const OneProfileDetails = async (req, res) => {
    try{
        let user_id = req.headers["user_id"];
        let data = await usersModel.findOne({"_id": user_id});
        return res.json({status:"Success", Message: "User Profile Details successfully", data: data});
    }
    catch(err){ 
        return res.json({status:"Fail", Message: err.toString()});
    }
}

// All Profile Read
export const AllProfileDetails = async (req, res) => {
    try{
        let data = await usersModel.find();
        return res.json({status:"Success", Message: "User Profile Details successfully", data: data});
    }
    catch(err){ 
        return res.json({status:"Fail", Message: err.toString()});
    }
}

// Profile Update
export const ProfileUpdate = async (req, res) => {
    try{
        let reqBody = req.body;
        let user_id = req.headers["user_id"];
        await usersModel.updateOne({"_id": user_id}, reqBody);
        return res.json({status:"Success", Message: "User Profile Updated successfully"});
    }
    catch(err){ 
        return res.json({status:"Fail", Message: err.toString()});
    }
}

// Profile Delete
export const ProfileDelete = async (req, res) => {
    try{
        let user_id = req.headers["user_id"];
        await usersModel.deleteOne({"_id":user_id});
        return res.json({status:"Success", Message : "Task Deleted Successfully"});
    }
    catch(err){ 
        return res.json({status:"Fail", Message: err.toString()});
    }
}