
// require mongoose in our model
const mongoose = require("mongoose");
// require bcrypt for harshing password;
const bcrypt = require('bcrypt');


//creating our schema and its attributes.
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "please provide a name"],
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6,
    },
    // to know if the user is an admin or a user.
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'

    }
});

//we did our password harshing in the data base level.
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
// compering password in the db leavel. using compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    // using bcrypt to compare password
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}




module.exports = mongoose.model('User', UserSchema);