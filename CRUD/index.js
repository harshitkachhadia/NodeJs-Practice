import express from 'express';
import bodyParser from "body-parser";
import userRoutes from './routes/users.js'

const app = express();
const PORT = 3000;


//The bodyParser comes with Express, 
//and it allows us to take in the incoming POST request body
app.use(bodyParser.json());

// Routes - 
app.use('/users',userRoutes);

// General Implementation using instance of Express App
// GET Request - 
app.get("/",(req,res) => {
    // console.log("Get Request End Point Executed");
    res.send("Hello from Home Page")
})

//

app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`));
