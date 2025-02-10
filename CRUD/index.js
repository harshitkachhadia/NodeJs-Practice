import express from 'express';
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

//The bodyParser comes with Express, 
//and it allows us to take in the incoming POST request body
app.use(bodyParser.json());

app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`));
