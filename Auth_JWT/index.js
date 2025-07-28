const express = require('express');
const jwt = require('jsonwebtoken');
// needs to store in .env file
const JWT_SECRET = "harshitkachhadiacohort3.0";
const PORT = 3000;

const app = express();
// Middlewares
app.use(express.json());

const users = [];
// Route Handlers
app.post('/signup',(req,res) => {
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

app.post('/signin',(req,res) => {
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

// Authenticated EndPoint
app.get('/me',(req,res) => {
    const token = req.headers.authorization; // JWT 
    const decodedInformation = jwt.verify(token,JWT_SECRET); 
    const username = decodedInformation.username;

    // Now we have username , so based on this we can find the password
    const user = users.find((user) => user.username === username);
    if(user){
        res.send({
            username: user.username,
            password: user.password
        })
    } else {
        res.status(403).send({
            message:"Unauthorized"
        })
    }
})


app.listen(PORT,() => console.log(`Server started on port ${PORT}`));