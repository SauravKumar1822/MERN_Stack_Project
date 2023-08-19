import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/Users.js";

const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(user) return res.status(400).json({message: 'User already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        username,
        password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({message: 'User created'});
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = {
        username,
        password
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({accessToken});
});


export default router;