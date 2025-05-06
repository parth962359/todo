const express = require("express");
const bodyParser = require("body-parser");
const fs=require("fs");

// initialize Express.js server and save as a variable
// so it can be referred to as `app`
const app = express();

app.use(bodyParser.json());
let data =fs.readFileSync("text.json",'utf8') // In-memory storage for todos
let todos=JSON.parse(data);

console.log(todos);
// GET endpoint to fetch all todo items
app.get("/todos", (req, res) => {
  res.json(todos);
 
});

// POST endpoint to create a new todo item
// provide `title` and optionally `completed` in the request body as JSON
app.post("/todos", (req, res) => {
  const todo = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed || false,
  };

  todos.push(todo);

  fs.writeFile('text.json',JSON.stringify(todos),(err)=>{console.log(err);
  });

  res.json("new todo created");
});

// PUT endpiont to update an existing todo item with the specified `id`
// provide updated `title` and/or `completed` in the request body as JSON
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
 
  todo.title = req.body.title;
  todo.completed = req.body.completed ;
  fs.writeFile('text.json',JSON.stringify(todos),(err)=>{console.log(err);
  });
  res.json(todo);
});

// DELETE endpoint to remove an existing todo item with the specified `id`
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.send("todo not found");
  }
  todos.splice(index, 1);
  fs.writeFile('text.json',JSON.stringify(todos),(err)=>{console.log(err);
  });
  res.send("todo deleted");
});


app.listen(3000);