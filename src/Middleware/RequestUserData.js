const https = require('https');
const axios = require('axios');
const oauthConfig = require('../../config/config.local.js').oauth;

const RequestUserData = async (req, res, next) =>
{
    const userResponse = await sendRequest(req.accessToken);

    req.userData = userResponse.data;

    next();
};

module.exports = RequestUserData;

const sendRequest = async (accessToken) => 
{
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        return await axios.get(
            oauthConfig.apiEndpoint,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                httpsAgent: agent
            }
        );
    } catch (error) {
        console.log(error);
    }
};