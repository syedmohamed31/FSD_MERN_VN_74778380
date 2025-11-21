const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./stuRoutes");
const app =  express()

const PORT = 8000;

mongoose.connect("mongodb+srv://username:sasi2003@cluster0.cjbe3o9.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("connected to DB");
})
.catch((err) =>{
    console.log("Error connecting to database",err);
});

// Middleware
app.use(express.json())

app.use(userRoutes)
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
});