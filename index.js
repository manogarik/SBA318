const express = require("express");

// We import the body-parser package.
// This package contains middleware that can handle
// the parsing of many different kinds of data,
// making it easier to work with data in routes that
// accept data from the client (POST, PATCH).
const bodyParser = require("body-parser");


const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const path = require('path');

const app = express();
const port = 3000;

// We use the body-parser middleware FIRST so that
// we have access to the parsed data within our routes.
// Create and use at least two pieces of custom middleware.


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine.

app.set('view engine','ejs');

app.get('/',(req,res) =>
    {
        res.render('welcome',({title : 'EJS'}));
    })
    
    app.get('/register',(req,res)=>
    {
        res.render('register');
    })
    
    

//Use at least three different data categories (e.g., users, posts, or comments).

app.use("/api/users", users);
app.use("/api/posts",posts);
app.use("/api/comments", comments);

//Create and use error-handling middleware.
app.use((req, res) => {
    res.status(404);
     res.json({ error: "Resource Not Found" });
   });
  
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });