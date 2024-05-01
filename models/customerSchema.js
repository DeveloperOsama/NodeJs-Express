const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema (structural of the article)

const customerSchema = new Schema ({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    age: String,
    country: String,
    gender: String,
},
    {
        timestamps: true,
    }
);

// create a model based on the schema

const User = mongoose.model('Customer', customerSchema);


// export the model 

module.exports = User;