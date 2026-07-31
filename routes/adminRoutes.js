const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const Admin = require("../models/Admin");

// ==============================
// Create Default Admin
// ==============================

router.get("/create-default", async(req,res)=>{

    try{

        const exists = await Admin.findOne({username:"admin"});

        if(exists){

            return res.json({
                success:true,
                message:"Admin Already Exists"
            });

        }

        const hashedPassword = await bcrypt.hash("Admin@123",10);

        await Admin.create({

            username:"admin",
            password:hashedPassword

        });

        res.json({

            success:true,
            message:"Default Admin Created"

        });

    }catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

});

// ==============================
// Login
// ==============================

router.post("/login", async(req,res)=>{

    try{

        const {username,password}=req.body;

        const admin = await Admin.findOne({username});

        if(!admin){

            return res.status(401).json({

                success:false,
                message:"Invalid Username"

            });

        }

        const match = await bcrypt.compare(password,admin.password);

        if(!match){

            return res.status(401).json({

                success:false,
                message:"Invalid Password"

            });

        }

        const token = jwt.sign(

            {
                id:admin._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        );

        res.json({

            success:true,
            token,
            username:admin.username

        });

    }catch(err){

        res.status(500).json({

            success:false,
            message:err.message

        });

    }

});

module.exports = router;