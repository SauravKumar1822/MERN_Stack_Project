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
    const user = await UserModel.findOne({username});

    if(!user) return res.status(400).json({message: 'User does not exist'});

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

    const accessToken = jwt.sign({id: user._id}, "secret", {expiresIn: '7d'});
    res.status(200).json({token: accessToken, userId:user._id});
    
});

export const verifyToken=(req, res, next) => {
    const token = req.headers.authorization;
    if(!token) 
        return res.status(401).json({message: 'You are not authenticated'});
    const verified = jwt.verify(token, "secret");
    if(!verified) 
        return res.status(401).json({message: 'You are not authenticated'});
    next();
}

export default router;