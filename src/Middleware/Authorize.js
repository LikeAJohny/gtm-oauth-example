const qs = require('qs');
const oauthConfig = require('../../config/config.local.js').oauth;

const Authorize = async (req, res, next) =>
{
    if (req.query.code) {
        req.authorizationCode = req.query.code;

        next();
    } else {
        const query = {
            response_type: oauthConfig.responseType,
            client_id: oauthConfig.clientId,
            redirect_uri: oauthConfig.redirectUri,
            state: Math.random(),
            approval_prompt: oauthConfig.approvalPrompt
        };

        const url = `${oauthConfig.authorizationEndpoint}?${qs.stringify(query)}`;
        res.redirect(url);
    }
};

module.exports = Authorize;