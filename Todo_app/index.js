const express = require("express");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { auth, JWT_SECRET } = require("./auth");
const { UserModel, TodoModel } = require("./db");
const PORT = 3000;

// Database Connection
mongoose.connect('')
const app = express();

app.use(express.json())
app.post('/signup',async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email,
        password,
        name
    })
    res.json({
        message: "You are Signed Up !"
    })
});
app.post('/signin', async function (req,res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email:email,
        password: password
    })
    console.log(user);
    
    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET)
        res.json({
            token
        })
    }else[
        res.status(403).json({
            message: "Invalid Credentials"
        })
    ]
});


app.post('/todo',auth,async function(req,res){
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;
    await TodoModel.create({
        title,
        userId,
        done
    })
    res.json({
        message: "Todo Created"
    })
});
app.get('/todos',auth, async function (req,res){
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId
    })
    res.json({
        todos
    })
});

app.listen(PORT,() => console.log(`Server started on Port : ${PORT}`));
