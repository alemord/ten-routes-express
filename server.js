const express = require("express");
const app = express();
const fs = require("fs");

app.set("views", "./views/home");
app.set("view engine", "html");
app.engine("html", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content.toString().replace(/{{(\w+)}}/g, (match, key) => {
      return options[key];
    });
    return callback(null, rendered);
  });
});
// Route 1: Home page
app.get("/", (req, res) => {
  console.log("Home page");
  const content = fs.readFileSync("./views/home.html", "utf8");
  res.send(content.replace("{message}", "Welcome to the movie website!"));
});

// Route 2: List of movies
app.get("/movies", (req, res) => {
  const movies = [
    "The Godfather",
    "The Shawshank Redemption",
    "The Dark Knight",
  ];
  const content = fs.readFileSync("./views/movies.html", "utf8");
  res.send(content.replace("{movies}", movies.join(", ")));
});

// Route 3: Single movie
app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = { id: id, title: "The Godfather", year: 1972 };
  const content = fs.readFileSync("./views/movie.html", "utf8");
  res.send(
    content
      .replace("{movie.id}", movie.id)
      .replace("{movie.title}", movie.title)
      .replace("{movie.year}", movie.year)
  );
});

// Route 4: Add movie form
app.get("/movies/add", (req, res) => {
  const content = fs.readFileSync("./views/add_movie.html", "utf8");
  res.send(content);
});

// Route 5: Save movie
app.post("/movies/save", (req, res) => {
  // Save movie logic goes here
  res.redirect("/movies");
});

// Route 6: Edit movie form
app.get("/movies/edit/:id", (req, res) => {
  const id = req.params.id;
  const movie = { id: id, title: "The Godfather", year: 1972 };
  const content = fs.readFileSync("./views/edit_movie.html", "utf8");
  res.send(
    content
      .replace("{movie.id}", movie.id)
      .replace("{movie.title}", movie.title)
      .replace("{movie.year}", movie.year)
  );
});

// Route 7: Update movie
app.post("/movies/update/:id", (req, res) => {
  const id = req.params.id;
  // Update movie logic goes here
  res.redirect("/movies");
});

// Route 8: Delete movie form
app.get("/movies/delete/:id", (req, res) => {
  const id = req.params.id;
  const movie = { id: id, title: "The Godfather", year: 1972 };
  const content = fs.readFileSync("./views/delete_movie.html", "utf8");
  res.send(
    content
      .replace("{movie.id}", movie.id)
      .replace("{movie.title}", movie.title)
      .replace("{movie.year}", movie.year)
  );
});

// Route 9: Confirm delete movie
app.post("/movies/confirm-delete/:id", (req, res) => {
  const id = req.params.id;
  // Delete movie logic goes here
  res.redirect("/movies");
});

// Route 10: About page
app.get("/about", (req, res) => {
  const content = fs.readFileSync("./views/about.html", "utf8");
  res.send(content.replace("{message}", "This is a website about movies."));
});

app.listen(3005, () => {
  console.log("Server listening on port 3005");
});
