import express from "express";
import mongoose from "mongoose";
import { RecipieModel } from "../models/Recipes.js";
import UserModel from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const recipes = await RecipieModel.find();
        res.status(200).json({ recipes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const { title, ingredients, instructions, imageUrl, cookingTime, userOwner } = req.body;
    const newRecipe = new RecipieModel({
        title,
        ingredients,
        instructions,
        imageUrl,
        cookingTime,
        userOwner
    });
    try {
        await newRecipe.save();
        res.status(201).json({ message: 'Recipe created' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.put("/", async (req, res) => { // update recipe
    try {
        const recipe = await RecipieModel.findById(req.body.recipeId);
        const user = await UserModel.findById(req.body.userId);
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(200).json({savedRecipes: user.savedRecipes});
    } catch {
        res.status(500).json({ message: error.message });
    }

});

router.get("/savedRecipes/ids", async (req, res) => { // get saved recipes ids
    try {
        const user = await UserModel.findById(req.query.userId);
        res.status(200).json({savedRecipes: user?.savedRecipes});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/savedRecipes", async (req, res) => { // get saved recipes
    try {
        const user = await UserModel.findById(req.query.userId);
        const savedRecipes = await RecipieModel.find({_id: {$in: user?.savedRecipes}});
        res.status(200).json({savedRecipes});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;