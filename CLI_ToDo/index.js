const fs = require('fs');
const path = require('path');
const {Command} = require('commander');

const program = new Command();

program
  .name('File related CLI')
  .description('Filesystem based todo list')
  .version('0.8.0');

const filePath = path.join(__dirname,"todos.json")
function readTodos(){
    if(!fs.existsSync(filePath)){
        return [];
    } else {
        const data = fs.readFileSync(filePath,'utf-8')
        return JSON.parse(data);
    }
}
function writeTodos(todos) {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), "utf-8");
}

program
    .command("add")
    .description("Add a new todo item")
    .argument("<Title>", "Enter the todo")
    .argument("<Time>", "Enter the finish time")
    .action((todoTitle, time) => {
        const todos = readTodos();

        const newTodo = {
            Title: todoTitle,
            Deadline: time,
            completed: false,
        };

        todos.push(newTodo);
        writeTodos(todos);

        console.log("Todo added successfully!");
    });
    program
    .command("remove")
    .description("Remove an existing todo item")
    .argument("<Todo>", "Enter the todo to delete")
    .action((todoTitle) => {
        let todos = readTodos();
        const updatedTodos = todos.filter((todo) => todo.Title !== todoTitle);

        if (todos.length === updatedTodos.length) {
            console.log("Todo not found!");
        } else {
            writeTodos(updatedTodos);
            console.log("Todo removed successfully!");
        }
    });
    program
    .command("mark")
    .description("Mark a todo item as done")
    .argument("<Todo>", "Enter the todo to mark as done")
    .action((todoTitle) => {
        let todos = readTodos();
        let todoFound = false;

        todos = todos.map((todo) => {
            if (todo.Title === todoTitle) {
                todo.completed = true;
                todoFound = true;
            }
            return todo;
        });

        if (todoFound) {
            writeTodos(todos);
            console.log("Todo marked as done!");
        } else {
            console.log("Todo not found!");
        }
    });
    program.parse();