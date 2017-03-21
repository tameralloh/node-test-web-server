const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


// This code is just for heroku to take port automatically
const port = process.env.PORT || 3000;


//initiate express server
var app = express();

// Register partials
hbs.registerPartials(__dirname + '/views/partials');
// Set view engine
app.set('view engine', 'hbs');


// Define Middleware
// Middleware 1
app.use((request, response, next)=> {
  var now = new Date().toString();
  var log = `${now}: ${request.url} ${request.method}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=> {
    if(err)
    {
      console.log('Unable to log segment!');
    }
  });
  next();
});

// Middleware 2
// app.use((request, response, next)=> {
//   response.render('error.hbs');
// });


// Define the folder path for static files
app.use(express.static(__dirname + '/public'));


// Helpers
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=> {
  return text.toUpperCase();
});

// Routes
app.get('/', (request, response) => {
  response.render('home.hbs', {
    title : 'Home Page 1',
    welcomeMessage : 'Home Page'
  });
});


app.get('/about', (request, response) => {
  //  response.send('<h2>about Express</h2>');
  response.render('about.hbs', {
    title : 'About Page'
  });
});


app.get('/projects', (request, response) => {
  response.render('projects.hbs', {
    title : 'projects'
  });
});


app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to find page'
    });
});

// Define the port to listen to

// app.listen(3000, ()=> {
//   console.log('Up on 3000 port');
// });

// Use dynamic port
app.listen(port, ()=> {
  console.log(`Up on ${port} port`);
});
