const express = require("express");
const corsMiddleware = require("./cors");
const app = express();

app.use(express.json());
app.options('*', corsMiddleware);
app.use(corsMiddleware);

app.get("/", (_, res) => {
  res.send("Server Started");
});

const reminders = require('./reminders/pageAccess');
app.use('/reminders', reminders);

app.listen(3000);
console.log("Listening on 3000");