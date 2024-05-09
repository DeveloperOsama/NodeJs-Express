const express = require('express');
const router = express.Router();
const User = require('../models/customerSchema');
var moment = require('moment');
//const Customer = require("../models/customerSchema");
const userController = require('../controllers/userController');



// backend routes for project learning
// Get Request
router.get("/", userController.getdataUser);
router.get("/user/add.html", userController.getAddUser);

router.get("/edit/:id",userController.getEditUser);

// Get view user
router.get("/view/:id", userController.getViewUser);

// POST Request
router.post("/user/add.html", userController.addUser);

// Search User by name
router.post('/search', userController.searchUser);

// DELETE Request
router.delete("/delete/:id", userController.deleteUser);

// PUT Request for updating data
router.put("/edit/:id", userController.updateUser);




module.exports = router