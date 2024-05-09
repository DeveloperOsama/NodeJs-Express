const User = require('../models/customerSchema');
const moment = require('moment');



// Get Request
const getdataUser = (req, res) => {

    // result ===> array of object
    User.find().then((result) => {
        res.render("index", { arr: result, moment: moment });
    }).catch(err => {
        console.log(err);
    });
}

const getAddUser = (req, res) => {
    res.render("user/add", {});
}

const getEditUser = (req, res) => {
    User.findById(req.params.id).then((user) => {
        //console.log(user);
        res.render("user/edit", { user: user, moment: moment });
    }).catch(err => {
        console.log(err);
    });
}

const getViewUser = (req, res) => {

    User.findById(req.params.id)
        .then((user) => {
            //console.log(user);
            res.render("user/view", { user: user, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
    //res.render("user/view");
}

// POST Request
// function add User
const addUser = (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(err);
    });
}

// Search user by name 

const searchUser = (req, res) => {

    const search = req.body.search.trim();

    User.find({ $or: [{firstName: search }, {lastName: search }] })
        .then((user) => {
            //console.log(user);
            res.render("user/search", { user: user });
        }).catch((err) => {
            console.log(err);
        });

    
}

// Delete a user

const deleteUser = (req, res) => {

    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
}

// Update the user

const updateUser = (req, res) => {

    User.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {getdataUser, getAddUser, getEditUser, getViewUser, 
    addUser, searchUser, deleteUser, updateUser} 
