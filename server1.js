const express = require("express");

const app = express();

app.get("/isUser", (req, res) => {
  const username = req.query.user;
  const num = req.query.n;
  if (username == "iharshka") {
    res.send(`User is authenticated, Harsh! \n\t\n
    Here is ${num}'s square: ${num * num}`);
  } else res.send("Unauthorized User, Harsh! Can't calculate the square");
});

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
