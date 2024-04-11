const https = require("https");
const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

const port = 443;
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(options, app).listen(port, () => {
  console.log(
    `Server is running on port ${port} at https://localhost:${port}/`
  );
});

const user = [
  {
    name: "Harsh",
    kidneys: [
      {
        ishealthy: true,
      },
      {
        ishealthy: false,
      },
    ],
  },
];

function counthealthy() {
  var kidneys = user[0].kidneys;
  var totalkidneys = kidneys.length;
  var healthykidneys = 0;
  var unhealthykidneys = 0;

  for (let i = 0; i < totalkidneys; i++) {
    if (kidneys[i].ishealthy == true) healthykidneys += 1;
  }
  unhealthykidneys = totalkidneys - healthykidneys;
  return { totalkidneys, kidneys, unhealthykidneys, healthykidneys };
}

app.get("/", function (req, res) {
  const { totalkidneys, kidneys, unhealthykidneys, healthykidneys } =
    counthealthy(); //Object Destructing: Creates on object by extracting properties from another object
  res.send({ totalkidneys, healthykidneys, unhealthykidneys, kidneys });
  console.log("Kidney fetched!");
});

app.post("/", function (req, res) {
  console.log(req.body);
  const newkidney = req.body.ishealthy;
  if (newkidney === Boolean) {
    user[0].kidneys.push({
      ishealthy: newkidney,
    });
    res.send("Added new kidney to the vault!");
    console.log("Kidney added");
  } else {
    res
      .status(411)
      .json({ msg: "ishealthy not boolean. Enter true/false only" });
    console.log("Kidney not added. ishealthy is not boolean.");
  }
});

app.put("/", function (req, res) {
  const { unhealthykidneys } = counthealthy();
  if (unhealthykidneys) {
    for (let i = 0; i < user[0].kidneys.length; i++)
      user[0].kidneys[i].ishealthy = true;
    res.json({ msg: "No unhealthy kidney found!" });
    console.log("Updated kidneys to healthy!");
  } else {
    res.status(411).json({ msg: "No unhealthy kidney found!" });
  }
});

app.delete("/", function (req, res) {
  // user.pop();
  const { unhealthykidneys } = counthealthy();
  if (unhealthykidneys) {
    const makehealthykidneys = [];
    for (let i = 0; i < user[0].kidneys.length; i++) {
      if (user[0].kidneys[i].ishealthy)
        makehealthykidneys.push({
          ishealthy: true,
        });
    }
    user[0].kidneys = makehealthykidneys;
    res.send("Deleted unhealthy kidneys, death is near!");
    console.log("Deleted unhealthy kidneys, death is near!");
  } else {
    res.status(411).json({ msg: "No unhealthy kidneys found!" });
    console.log("No unhealthy kidneys found!");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port, 3000");
});
