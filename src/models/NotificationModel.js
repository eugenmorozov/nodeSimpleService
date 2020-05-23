const mongoose = require('mongoose');

let NotificationSchema = new mongoose.Schema({
    'message': {
        type: String,
        unique: true,
        required: [true, 'Please, specify notification message']
    },
    'created': {
        type: Date,
        default: Date.now
    },

}, {collection: 'notifications'});

NotificationSchema.statics.getMessages = async () => {
    try{
        let messages = await exports.find().sort({created : 1}).exec();
        return messages || [];
    } catch (e) {
        return [];
    }
};

module.exports = exports = mongoose.model('NotificationModel', NotificationSchema);
