const https = require('https');
const axios = require('axios');
const oauthConfig = require('../../config/config.local.js').oauth;

const RequestAccessToken = async (req, res, next) => 
{
    const tokenResponse = await sendRequest(req.authorizationCode);

    req.accessToken = tokenResponse.data.access_token;

    next();
};

module.exports = RequestAccessToken;

const sendRequest = async (authorizationCode) => 
{
    const params = {
        grant_type: oauthConfig.grantType,
        client_id: oauthConfig.clientId,
        client_secret: oauthConfig.clientSecret,
        redirect_uri: oauthConfig.redirectUri,
        code: authorizationCode
    };

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        return await axios(
            {
                url: oauthConfig.tokenEndpoint,
                method: 'POST',
                data: params,
                httpsAgent: agent
            }
        );
    } catch (error) {
        console.log(error);
    }
};