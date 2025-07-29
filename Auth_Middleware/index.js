const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "";
const PORT = 3000;

const app = express();

app.use(express.json())

const users = [];

// Middlewares :-
function logger(req,res,next){
    console.log(`${req.method} request came`);
    next();
}
// Authentication Middleware :- 
function auth(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({ message: "Unauthorized" });
            } else {
                // populate the req object with new user key and value
                // req = {status,header,body,query,.....,user}
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).send({ message: "Unauthorized" });
    }
}

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post('/signup',logger,(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username:username,
        password:password
    })
    console.log(users);
    
    
    res.send({
        message : "You have signed up"
    })
})

app.post('/signin',logger,(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);     
    if(user){
        const token = jwt.sign({username: user.username},JWT_SECRET);
        res.send({
            token
        })
        console.log(users);
    } else{
        console.log(users);
        
        res.status(403).send({
            message:"Invalid Username or Password"
        })
    }
})

// Authenticated route
app.get("/me",logger,auth,(req,res) => {
    const user = req.user;
    res.send({
        username: user.username
    })
})

app.listen(PORT,() => console.log(`Server started on port ${PORT}`))