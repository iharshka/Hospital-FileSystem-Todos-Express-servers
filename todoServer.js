const express = require("express");
const app = express();
app.use(express.json());

const todos = [
  {
    title: "Market purchases",
    description: "Buy groceries",
    completed: false,
    id: 100,
  },
  {
    title: "Academic Work",
    description: "Prepare VIth Semester Lab Reports of all Labarotories",
    completed: false,
    id: 101,
  },
];

//Function to get Todo by its id from req.params
function gettodobyid(todoid) {
  var todoindex = "DNE"; //DNE: Does Not Exist (giving default value for id not found to send 404)
  for (let i = 0; i < todos.length; i++) {
    if (todoid === todos[i].id) todoindex = i;
  }
  return todoindex;
}

//RETRIEVING all Todos by GET call
app.get("/todos", (req, res) => {
  res.json({ statusCode: 200, todos });
  console.log("Todos fetched!");
});

//Retrieving specific Todo using ID of the todo & GET method
app.get("/todos/:id", (req, res) => {
  // console.log(typeof req.params.id);
  const todoid = parseInt(req.params.id, 10); //it is of string type so have to convert this to number by parseInt function
  const todoindex = gettodobyid(todoid);
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
});

//CREATE a new Todo by POST method
app.post("/addtodo", (req, res) => {
  const todo = req.body;
  todos.push(todo);
  todos[todos.length - 1].id = todos.length + 99; //Giving ID to the todo entered by user
  console.log(`Todo ID ${todos.length + 99} created!`);
  console.log(todo);
  res.json({ statusCode: 200, msg: "Todo created!" });
});

//UPDATE an already existing Todo by PUT method
app.put("/updatetodo/:id", (req, res) => {
  const todoid = parseInt(req.params.id, 10);
  const todoindex = gettodobyid(todoid);
  if (todoindex === "DNE") {
    res.json({
      statusCode: 404,
      msg: "Todo not found, use only those IDs that exist!",
    });
    console.log(`Todo ID ${todoid} doesn't exist!`);
    return;
  } else {
    const updatelement = req.body;
    if (updatelement.title) {
      todos[todoindex].title = updatelement.title;
    }
    if (updatelement.description) {
      todos[todoindex].description = updatelement.description;
    }
    if (updatelement.completed) {
      todos[todoindex].completed = updatelement.completed;
    }
    res.json({ statusCode: 200, msg: "Todo Updated!" });
    console.log("Update todo: ", updatelement);
    console.log(`Todo ${todoid} updated!`);
    console.log("Updated Todos: ", todos[todoindex]);
  }
});

//DELETE an existing Todo by DELETE method
app.delete("/deletetodo/:id", (req, res) => {
  const todoid = parseInt(req.params.id, 10);
  const todoindex = gettodobyid(todoid);
  if (todoindex === "DNE") {
    res.json({
      statusCode: 404,
      msg: "Todo not found, use only those IDs that exist!",
    });
    console.log(`Todo ID ${todoid} doesn't exist!`);
    return;
  } else {
    res.send({
      statusCode: 200,
      deletedTodo: todos[todoindex],
    });
    todos.splice(todoindex, 1);
    console.log(`Deleted the ${req.params.id} Todo!`);
  }
});

app.listen(3000, () => {
  console.log("Todos app running on port 3000");
});
