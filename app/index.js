const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, )));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', path.join(__dirname)); // Set the views directory

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
  const formData = req.body;
  // Store the form data in the session
  req.session.formData = formData;

  // Redirect to the results page
  res.redirect('/results');
});

app.get('/results', (req, res) => {
  // Retrieve the form data from the session
  const formData = req.session.formData;
  if (!formData) {
    // If there is no form data in the session,
    // redirect the user to the homepage
    res.redirect('/');
  }

  // Clear the form data from the session
  req.session.formData = null;

  // Render the results page and pass the form data
  res.render('results', { formData });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});