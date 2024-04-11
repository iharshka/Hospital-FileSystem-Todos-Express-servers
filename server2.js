const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi there from server2");
});

app.listen(3001);

//tested running multiple server on same port, they do not work parallely. Have to change the port
