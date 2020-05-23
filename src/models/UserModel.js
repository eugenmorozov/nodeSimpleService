const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    'login': {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    'password': {
        type: String
    },
    'role': {
        type: Number,
        required: true,
        index: true
    }

}, {collection: 'users'});


//Any password encryption strategy can be implemented here.
function getHash(password) {
    return password.toString();
}

UserSchema.methods.setPassword = function(password){
    this.password = getHash(password);
}

UserSchema.methods.validatePassword = function(password) {
    return getHash(password) === this.password;
}

UserSchema.statics.authenticate = async function({login, password}){
    const user = await exports.findOne({
        login
    }).exec();
    if (user && user.validatePassword(password)) {
        return {
            login,
            role: user.role
        };
    }
};

UserSchema.statics.getByLogin = async (login) => {
    const user = await exports.findOne({
        login
    }).exec();
    if (user) {
        return {
            login,
            role: user.role
        };
    }
    else {
        return undefined;
    }
};


module.exports = exports = mongoose.model('UserModel', UserSchema);
