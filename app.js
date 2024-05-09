const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const App = require("./models/mydataSchema");
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const allRoutes = require('./routes/allRoutes');
app.use(allRoutes)


// Auoto refreshes
const path = require('path');
const livereload = require("livereload");
const lrserver = livereload.createServer();
lrserver.watch(path.join(__dirname, 'public'));

const connectlivereload = require('connect-livereload');
app.use(connectlivereload());

lrserver.server.once("connections", () => {
  setTimeout(() => {
    lrserver.refresh("/");
  },
    1000);
})


// get data from database
/*app.get('/', (req, res) => {

  // resulte array of objects
  App.find()
  .then((result)=> {
    res.render("home", {mytitle: 'Home Page', arr: result});
  })
  .catch((err) => {
    console.log(err)
  });
});*/

// app.get("/index.html", (req, res) => {
//   res.send("<h1>Send Successfully!!</h1>")
// });



// conction DB

mongoose.connect("mongodb+srv://devosama:amal771236356@cluster0.xzcy2ta.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`)
    });
  })
  .catch((err) => {
    console.log(err);
  });

// send data to the cluster server
/*app.post("/", (req, res) => {
    console.log(req.body);

    const app = new App(req.body);

    app.save().then(() => {
      res.redirect("/index.html");
    }).catch((err) => {
      console.log(err);
    });
});*/