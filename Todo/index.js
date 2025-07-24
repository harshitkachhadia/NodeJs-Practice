const express = require('express');
const app = express();

// middle to parse data from client , useful for json data coming through 
// post,put,delete methods route
app.use(express.json());


// Array of objects to hold all todos
const todos = [
    { id: 1, title: 'Buy milk', completed: false }
]

// To retrieve all todos
app.get('/todos',(req,res) => {
    res.send(todos);
})

// To create a new todo
app.post('/todos',(req,res) => {
    todos.push({
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    })
    res.send("Todo added Successfully");
})

// To Update a particular todo
app.put('/todos',(req,res) => {
    let todo = todos.find(todo => todo.id == req.body.id);
    if(todo){
        todo.title = req.body.title;
        todo.completed = req.body.completed;
        res.send("Todo updated Successfully");
    } else {
        res.status(404).send("Todo not found");
    }
})

// To delete a particular todo
app.delete('/todos',(req,res) => {
   const index = todos.findIndex(todo => todo.id == req.body.id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.send("Todo deleted Successfully");
  } else {
    res.status(404).send("Todo not found");
  }
})

// Server is listening on port 3000
app.listen(3000,() => console.log('Server Started on port 3000'))