const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the schema object 
const appSchema = new Schema({
    userNameee: String
});


// Create a model based on the schema object
const App = mongoose.model("App", appSchema);


// export the model 
module.exports = App;

