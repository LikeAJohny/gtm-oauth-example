const path = require('path');

const RenderUser = (req, res) =>
{
    res.render(
        path.join(__dirname + '/../View/user.pug'),
        {
            user: JSON.stringify(req.userData, undefined, 4)
        }
    );
};

module.exports = RenderUser;