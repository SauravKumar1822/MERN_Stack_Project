import express from 'express'; // import express
import cors from 'cors'; // cross origin resource sharing (CORS)
import mongoose from 'mongoose'; // import mongoose for MongoDB

const app = express(); // create variable app and assign express function

app.use(cors()); // use cors
app.use(express.json()); // use express.json

mongoose.connect('mongodb+srv://Saurav:shwetalove@saurav.z9l1iw4.mongodb.net/Saurav?retryWrites=true&w=majority');

app.listen(3001, () => { // listen to port 3001
    console.log('Server is running on port 3001');
});