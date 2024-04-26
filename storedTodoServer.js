const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

//Function to get Todo by its id from req.params
async function gettodobyid(todoid) {
  var todoindex = "DNE"; //DNE: Does Not Exist (giving default value for id not found to send 404)
  await readtodos().then((data) => {
    // console.log(data);
    var todos = data;
    for (let i = 0; i < todos.length; i++) {
      if (todoid === todos[i].id) todoindex = i;
    }
  });
  // console.log(todoindex); // it has value = 0, 1, 2, 3, 4 or whatever integer but it gets wrapped inside Promise when returned since the fn is async
  return todoindex; //return Promise { 0 } so have to resolve the promise it with
}

//Reading stored Todos in todos.json via fs
function readtodos() {
  return new Promise(function (resolve, reject) {
    fs.readFile("todo.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        data = JSON.parse(data.replace(/\r?\n|\r/g, ""));
        // console.log(data); //data is an array of objects of todos
        resolve(data);
      }
    });
  });
}

//WRITE stored todos in todos.json with fs
async function addnewTodo(todo) {
  await readtodos().then((data) => {
    var todos = data;
    todos.push(todo);
    todos[todos.length - 1].id = todos.length + 99;
    fs.writeFile("todo.json", JSON.stringify(todos), (err) => {
      if (err) return err;
    });
    console.log(`Todo ID ${todos.length + 99} created!`);
  });
}

//Routers START from here

//RETRIEVING all Todos by GET call
app.get("/todos", (req, res) => {
  readtodos()
    .then((data) => {
      res.json({ statusCode: 200, todos: data });
    })
    .catch((err) => {
      res.json({ statusCode: 500, msg: err });
    });
  console.log("Todos fetched!");
});

//Retrieving specific Todo using ID of the todo & GET method
app.get("/todos/:id", (req, res) => {
  // console.log(typeof req.params.id);
  const todoid = parseInt(req.params.id, 10); //it is of string type so have to convert this to number by parseInt function
  gettodobyid(todoid).then((todoindex) => {
    readtodos()
      .then((data) => {
        // console.log(data);
        const todos = data;
        console.log(todoindex);
        if (todoindex == "DNE") {
          res.json({
            statusCode: 404,
            msg: "Todo not found, use only those Todos IDs that exist!",
          });
          console.log(`Todo ID ${todoid} doesn't exist!`);
          return;
        } else {
          res.send({
            statusCode: 200,
            todo: todos[todoindex],
          });
          console.log(`Fetched the ${req.params.id} Todo!`);
        }
      })
      .catch((err) => {
        res.send({ statusCode: 500, msg: err });
      });
  });
});

//CREATE a new Todo by POST method
app.post("/addtodo", (req, res) => {
  const todo = req.body;
  console.log(todo);
  addnewTodo(todo).then((err) => {
    if (err) res.send({ statusCode: 500, msg: "Can't perform the action" });
    else res.send({ statusCode: 200, msg: "Todo added successfully!" });
  });
});

//UPDATE an already existing Todo by PUT method
app.put("/updatetodo/:id", (req, res) => {
  const todoid = parseInt(req.params.id, 10);
  gettodobyid(todoid).then((todoindex) => {
    if (todoindex === "DNE") {
      res.json({
        statusCode: 404,
        msg: "Todo not found, use only those IDs that exist!",
      });
      console.log(`Todo ID ${todoid} doesn't exist!`);
      return;
    } else {
      const updatelement = req.body;
      readtodos().then((data) => {
        const todos = data;
        if (updatelement.title) {
          todos[todoindex].title = updatelement.title;
        }
        if (updatelement.description) {
          todos[todoindex].description = updatelement.description;
        }
        if (updatelement.completed) {
          todos[todoindex].completed = updatelement.completed;
        }
        fs.writeFile("todo.json", JSON.stringify(todos), (err) => {
          if (err) res.send({ statusCode: 500, msg: err });
          else {
            res.json({ statusCode: 200, msg: "Todo Updated!" });
            console.log("Update todo: ", updatelement);
            console.log(`Todo ${todoid} updated!`);
            console.log("Updated Todos: ", todos);
          }
        });
      });
    }
  });
});

//DELETE an existing Todo by DELETE method
app.delete("/deletetodo/:id", (req, res) => {
  const todoid = parseInt(req.params.id, 10);
  gettodobyid(todoid).then((todoindex) => {
    if (todoindex === "DNE") {
      res.json({
        statusCode: 404,
        msg: "Todo not found, use only those IDs that exist!",
      });
      console.log(`Todo ID ${todoid} doesn't exist!`);
      return;
    } else {
      readtodos().then((data) => {
        const todos = data;
        res.send({
          statusCode: 200,
          msg: `Deleted the Todo ${req.params.id} sucessfully!`,
          deletedTodo: todos[todoindex],
        });
        todos.splice(todoindex, 1);
        fs.writeFile("todo.json", JSON.stringify(todos), (err) => {
          if (err) res.send({ statusCode: 500, msg: err });
        });
        console.log(`Deleted the ${req.params.id} Todo!`);
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Todos app running on port 3000");
});
