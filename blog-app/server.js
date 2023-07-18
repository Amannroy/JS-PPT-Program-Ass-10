// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost/blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Blog Post model
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// User model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Get all blog posts
app.get('/api/posts', (req, res) => {
  BlogPost.find({}, (err, posts) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving blog posts.' });
    } else {
      res.status(200).json(posts);
    }
  });
});

// Create a new blog post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const post = new BlogPost({ title, content });
  post.save((err) => {
    if (err) {
      res.status(500).json({ error: 'Error creating a new blog post.' });
    } else {
      res.status(200).json({ message: 'Blog post created successfully.' });
    }
  });
});

// Update a blog post
app.put('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  BlogPost.findByIdAndUpdate(
    postId,
    { title, content },
    { new: true },
    (err, updatedPost) => {
      if (err) {
        res.status(500).json({ error: 'Error updating the blog post.' });
      } else {
        res.status(200).json(updatedPost);
      }
    }
  );
});

// Delete a blog post
app.delete('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  BlogPost.findByIdAndRemove(postId, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting the blog post.' });
    } else {
      res.status(200).json({ message: 'Blog post deleted successfully.' });
    }
  });
});

// User registration
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save((err) => {
    if (err) {
      res.status(500).json({ error: 'Error registering new user.' });
    } else {
      res.status(200).json({ message: 'User registered successfully.' });
    }
  });
});

// User login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ error: 'Authentication failed.' });
    } else {
      res.status(200).json({ message: 'Login successful.' });
    }
  });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
