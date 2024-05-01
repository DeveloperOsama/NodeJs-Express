const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose');
const App = require("./models/mydataSchema");
const Customer = require("./models/customerSchema");
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
var moment = require('moment');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Auoto refreshes
const path = require('path');
const livereload = require("livereload");
const lrserver = livereload.createServer();
lrserver.watch(path.join(__dirname, 'public'));

const connectlivereload = require('connect-livereload');
const User = require('./models/customerSchema');
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

// backend routes for project learning
// Get Request
app.get("/", (req, res) => {
  
  // result ===> array of object
  Customer.find().then((result) => {
    res.render("index", { arr: result, moment: moment });
  }).catch(err => {
    console.log(err);
  });

});
app.get("/user/add.html", (req, res) => {
  res.render("user/add", {});
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id).then((user) => {
    //console.log(user);
    res.render("user/edit", {user: user, moment: moment});
  }).catch(err => {
    console.log(err);
  });
});

// Get view user
app.get("/view/:id", (req, res) => {

  User.findById(req.params.id)
    .then((user) => {
      //console.log(user);
      res.render("user/view", {user: user, moment: moment});
    })
    .catch((err) => {
      console.log(err);
    });
      //res.render("user/view");
});

// POST Request

app.post("/user/add.html", (req, res) => {
  //console.log(req.body);

  const customer = new Customer(req.body);
  customer.save().then(() => {
    res.redirect("/");
  }).catch(err => {
    console.log(err);
  });

});

// DELETE Request

app.delete("/delete/:id", (req, res) => {

  User.findByIdAndDelete(req.params.id)
   .then(() => {
      res.redirect("/");
    })
   .catch((err) => {
      console.log(err);
    });

});


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