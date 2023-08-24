import mongoose from "mongoose";

const RecipieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    ingredients: [{type: String,required: true}],
    instructions: {type: String,required: true},   
    imageUrl: {type: String,required: true}, 
    cookingTime: {type: Number,required: true},
    userOwner: {type: mongoose.Schema.Types.ObjectId ,ref: "user", required: true},
});

export const RecipieModel = mongoose.model("Recipes", RecipieSchema);