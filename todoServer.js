const express = require("express");
const app = express();

app.get("/todos", (req, res) => {});

app.listen(3000, () => {
  console.log("Todos app running on port 3000");
});
