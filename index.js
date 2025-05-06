const express = require("express");
const bodyParser = require("body-parser");
const fs=require("fs");

const app = express();

app.use(bodyParser.json());
let data =fs.readFileSync("text.json",'utf8') 
let todos=JSON.parse(data);

console.log(todos);

app.get("/todos", (req, res) => {
  res.json(todos);
 
});

app.post("/todos", (req, res) => {
  const todo = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed
  };

  todos.push(todo);

  fs.writeFile('text.json',JSON.stringify(todos),(err)=>{console.log(err);
  });

  res.json("new todo created");
});


app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
 
  todo.title = req.body.title;
  todo.completed = req.body.completed ;
  fs.writeFile('text.json',JSON.stringify(todos),(err)=>{console.log(err);
  });
  res.json(todo);
});


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
