const mongoose = require("mongoose");
const config = require("config");
const db = process.env.MONGODB_URL || config.MONGODB_URL;

mongoose.connect(db,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to database !!');
})
.catch((err)=>{
    console.log('Connection failed !!'+ err.message);
});


// connectDB();