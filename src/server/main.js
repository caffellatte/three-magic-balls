const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "..", "client");
console.log(publicDirectory);

app.use(express.static(publicDirectory));

// Sample API endpoint
app.get("/api/todos", (req, res) => {
  res.json([
    { id: 1, title: "Learn Backbone.js", completed: false },
    { id: 2, title: "Build a simple app", completed: false },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
