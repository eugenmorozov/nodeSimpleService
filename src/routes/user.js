﻿const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.post('/authenticate', async (req, res, next) => {
    try {
        const user = await User.authenticate(req.body);
        if (user) {
            res.cookie('user', user.login, {maxAge: 900000, httpOnly: true});
            res.json(user)
        } else {
            res.status(400).json({message: 'Username or password is incorrect'});
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
