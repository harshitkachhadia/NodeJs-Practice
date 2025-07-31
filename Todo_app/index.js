const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { auth, JWT_SECRET } = require("./auth");
const { UserModel, TodoModel } = require("./db");
const PORT = 3000;

// Database Connection
mongoose.connect();
const app = express();

app.use(express.json());

app.post("/signup", async function (req, res) {
    // Input Validation using Zod 
    // step 1. Define the Schema
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(3).min(10).uppercase() // 1 Uppercase/Lowercase/specialcase char
    });
    /* step 2. parsing the data
        const parsedData = requiredBody.parse(req.body); 
    */
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        res.status(422).json({
            message: "Incorrect format",
            error : parsedDataWithSuccess.error
        })
        return;
    }
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    // promisified version of bcrypt.hash function
    const hashedPassword = await bcrypt.hash(password, 6);
    await UserModel.create({
      email,
      password: hashedPassword,
      name,
    });
    res.json({
      message: "You are Signed Up !",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error While Signing up !",
    });
  }
});
app.post("/signin", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
      email: email,
    });
    // console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
        },
        JWT_SECRET
      );
      res.json({
        token,
      });
    } else {
      res.status(403).json({
        message: "Invalid Credentials",
      });
    }
  } catch(e){
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/todo", auth, async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;
  await TodoModel.create({
    title,
    userId,
    done,
  });
  res.json({
    message: "Todo Created",
  });
});
app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;
  const todos = await TodoModel.find({
    userId,
  });
  res.json({
    todos,
  });
});

app.listen(PORT, () => console.log(`Server started on Port : ${PORT}`));
