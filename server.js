const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = new express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log +'\n', (err) => {
    if(err) {
      console.log('Cannot append to server log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintanence.hbs', {
//       pageTitle: 'Maintanence Page'
//   });
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    name: 'Sunila',
    likes: [
      'Yoga',
      'Nature',
      'workout'
    ]
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  })
});

app.get('/bad', (req, res) => {
  res.send(
    {
      Error: 'Error page!'
    }
  );
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
