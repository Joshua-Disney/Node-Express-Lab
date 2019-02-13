const express = require('express');

const Posts = require('./postsModel.js');

const router = express.Router();

// router.use(express.json());

// All my gets and puts and stuff goes here.
// router.get('api/posts')  <--- example
// All things that say '/api/posts' is now just '/'
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      error: "The posts information could not be retrieved." 
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});

router.post('/', async (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  try {
    const newPost = await Posts.insert(post);
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The post has been removed"
      });
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    });
  }
});

router.put('/:id', async (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  try {
    const updatedPost = await Posts.update(req.params.id, post);
    if (post) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The post information could not be modified."
    });
  }
});

module.exports = router;
