const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware
const Authorize = require(path.join(__dirname + '/../src/Middleware/Authorize.js'));
const RequestAccessToken = require(path.join(__dirname + '/../src/Middleware/RequestAccessToken.js'));
const RequestUserData = require(path.join(__dirname + '/../src/Middleware/RequestUserData.js'));
// Handler
const RenderUser = require(path.join(__dirname + '/../src/Handler/RenderUser.js'));

router.get('/', (req, res, next) => {
    res.render(path.join(__dirname + '/../src/View/user.pug'));
});

router.get(
    '/login', 
    [
        Authorize, // udb.oauth2_auth-code_flow.md -> 1. & 2.
        RequestAccessToken, // udb.oauth2_auth-code_flow.md -> 3. & 4.
        RequestUserData, // udb.oauth2_auth-code_flow.md -> 5.
        RenderUser
    ]
);

module.exports = router;