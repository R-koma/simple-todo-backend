require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({ status: "todo" });
  res.json(todos);
});

app.get("/reviews", async (req, res) => {
  const reviews = await Todo.find({ status: "review" });
  res.json(reviews);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
  });
  await newTodo.save();
  res.json(newTodo);
});

app.put("/todos/:id/complete", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.status = "review";
  await todo.save();
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
