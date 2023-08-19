import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ // create a new mongoose schema
    username: {
        type: String, // type is string
        required: true, // required is true
        unique: true, // unique is true
        trim: true, // trim is true
        minlength: 3 // minlength is 3
    },
    password: {
        type: String, // type is string
        required: true, // required is true
        trim: true, // trim is true
        minlength: 6 // minlength is 3
    },
}, {
    timestamps: true, // timestamps is true
});

const UserModel = mongoose.model('Users', userSchema); // create a new mongoose model

export default UserModel; // export User

