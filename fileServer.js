const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  fs.readdir("./", (err, files) => {
    if (err) {
      res.json({ statusCode: 500, body: err });
      return;
    }
    res.json({ statusCode: 200, body: files });
    return;
  });
});

app.get("/files", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      res.json({ statusCode: 500, body: err });
      return;
    }
    res.json({ statusCode: 200, body: files });
    return;
  });
});

app.get("/:fileName", (req, res) => {
  fs.readFile(`./${req.params.fileName}`, "utf-8", (err, data) => {
    if (err) {
      res.json({ statusCode: 500, body: err });
      return;
    }
    res.json({ statusCode: 200, body: data });
    return;
  });
});

app.get("/files/:fileName", (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, data) => {
    if (err) {
      res.json({ statusCode: 500, body: err });
      return;
    }
    res.json({ statusCode: 200, body: data });
    return;
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
