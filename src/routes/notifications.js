﻿const express = require('express');
const router = express.Router();
const {authorize} = require('../middlewares/authorizationMiddleware');
const Notifications = require('../models/NotificationModel');
const permissions = require('../libs/permissions')

router.get('/', authorize([permissions.Read]), async (req, res, next) => {
    try {
        const messages = await Notifications.getMessages();
        res.send(messages);
    } catch (err) {
        next(err);
    }
});

router.post('/send', authorize([permissions.Create]), async (req, res, next) => {
    try {
        const notification = new Notifications({
            message: req.body.message
        });
        notification.save()
        res.send(notification);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
