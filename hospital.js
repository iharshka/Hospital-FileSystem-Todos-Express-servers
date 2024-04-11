const express = require("express");

const app = express();

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

app.get("/", function (req, res) {
  const kidneys = user[0].kidneys;
  const totalkidneys = kidneys.length;
  var healthykidneys = 0;

  for (let i = 0; i < totalkidneys; i++) {
    if (kidneys[i].ishealthy == true) healthykidneys += 1;
  }
  console.log("Kidney fetched!");

  const unhealthykidneys = totalkidneys - healthykidneys;

  res.send({ totalkidneys, healthykidneys, unhealthykidneys, kidneys });
});

app.use(express.json());

app.post("/", function (req, res) {
  const newkidney = req.body.ishealthy;
  user[0].kidneys.push({
    ishealthy: newkidney,
  });

  res.send("Work done!");
  console.log("Kidney added");
  console.log(req.body);
});

app.put("/", function (req, res) {
  for (let i = 0; i < user[0].kidneys.length; i++)
    user[0].kidneys[i].ishealthy = true;
  res.send("Updated kidneys");
});

app.delete("/", function (req, res) {
  // user.pop();
  const healthykidneys = [];
  for (let i = 0; i < user[0].kidneys.length; i++) {
    if (user[0].kidneys[i].ishealthy)
      healthykidneys.push({
        ishealthy: true,
      });
  }
  user[0].kidneys = healthykidneys;
  res.send("Deleted unhealthy kidneys, death is near!");
});

app.listen(3000, () => {
  console.log("Server is running on port, 3000");
});
