const mongoose = require('mongoose');
const permissions = require('../libs/permissions');

let RoleSchema = new mongoose.Schema({
    'id': {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    'name': {
        type: String,
        unique: true
    },
    'permissions': {
        type: [String],
        enum: Object.values(permissions),
        required: true
    }

}, {collection: 'roles'});

RoleSchema.statics.getPermissions = async (id) => {
    let userRole = await exports.findOne({id: id}).exec();
    if (userRole)
        return userRole.permissions;
    else
        return [];
};

module.exports = exports = mongoose.model('RoleModel', RoleSchema);
