const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const posts = require('./posts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/new-post', (req, res) => {
  res.render('new-post');
});

app.post('/new-post', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/');
});

app.get('/edit-post/:index', (req, res) => {
  const { index } = req.params;
  const post = posts[index];
  res.render('edit-post', { post, index });
});

app.post('/edit-post/:index', (req, res) => {
  const { index } = req.params;
  const { title, content } = req.body;
  posts[index] = { title, content };
  res.redirect('/');
});

app.post('/delete-post/:index', (req, res) => {
  const { index } = req.params;
  posts.splice(index, 1);
  res.redirect('/');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
