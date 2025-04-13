const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const comments = require("../data/locations");
const error = require("../utilities/error");






router
  .route("/")
  .get((req, res) => {
   const {userId} = req.query;
   const post = posts.filter((p)=> p.userId == userId);
   //Include query parameters for data filtering, where appropriate. At least one data category should allow for additional filtering through the use of query parameters.
   //This route uses a "userId" query parameter to filter posts, while the one above uses a route parameter.
   if(userId)
   {
    res.json(post);
    return;
   }
   
  res.json(posts);
   
  })

    
  .post((req, res) => {
    // Within the POST request route, we create a new
    // post with the data given by the client.
    if (req.body.userId && req.body.locId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        locId: req.body.locId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing post in the database.
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

//Retrieves all posts by a user with the specified id.
//Utilize route parameters, where appropriate.

router
.route("/api/users/:id/posts") 
.get((req, res, next) => {
  const post = posts.filter((p) => p.userId == req.params.id);
  if (post) res.json(post);
  else next();
})

//Retrieves all comments made on the post with the specified id.
router
.route("/:id/comments")
.get((req,res,next) => 
{
    const {userId} = req.query;
    if(userId)
    {
        const comment = comments.filter((c)=> (c.postId == req.params.id ) && (c.userId == userId))
        if(comment)
            res.json(comment);
        else
            next();
    }
    else
    {
        const comment = comments.filter((c)=> (c.postId == req.params.id ) && (c.userId == userId))
        if(comment)
            res.json(comment);
        else
            next();
    }
})
module.exports = router;
