const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs"); // using this we can bcrypt user password or we can call hash password.
const jwt = require("jsonwebtoken")
const doctorModel = require('../models/doctorModel')

// Register callback 
const registerController=async(req,res)=>{
  try{
    //  first we check user register email id, if user is already register then we re direct them on Login and if the user is new so register here
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }

    const password = req.body.password;
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    // using userModel we create new user
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: `Register Controller ${error.message}`,
      });
  }
};

// login callback
const loginController = async(req, res) => {
    try {
        // first get user , kon sa user hai
        const user= await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:"user not found", success:false})
        }
        // for password match
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message:`Invalid Email and Password`, success:false})
        }
        // generate token
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
        res.status(200).send({message:'Login Success', success:true, token})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`Error in Loging controller ${error.message}`})
        
    }

};

// 
const  authController= async(req, res)=>{
  try {
    const user = await userModel.findById({_id:req.body.userId})
    user.password=undefined;
    if(!user){
      return res.status(200).send({
        message:"user not found",
        success:false
      })
    }
    else{
      res.status(200).send({
        success:true,
        data:user
      })
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:"auth error",
      success:false,
    })
    
  }


}

// controller for Apply Doctor.
const applyDoctorController= async(req, res)=>{
     try {
      // here we write logic for 'form' get data , and store that data into database
       const newDoctor= await doctorModel({...req.body, status:'pending'})
       await newDoctor.save();

      //  get admin
      const adminUser =await userModel.findOne({isAdmin:true})
      
      const notification = adminUser.notification
      notification.push({
        type:'apply-doctor-request',
        message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
        data:{
          doctorId:newDoctor._id,
          name:newDoctor.firstName + " " + newDoctor.lastName,
          onclickPath:'/admin/doctors'
        }
      })
      await userModel.findByIdAndUpdate(adminUser._id, {notification})
      res.status(201).send({
        success:true,
        message:'Doctor Account Applied Successfully'
      })
      
     } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        error,
        message:'Error While Applying For Doctor'
      })
      
     }
}

module.exports = {applyDoctorController, loginController, registerController, authController };
