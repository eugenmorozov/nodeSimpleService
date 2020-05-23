const Role = require('../models/RoleModel');
const User = require('../models/UserModel');

const checkPermissions = (requiredPermissions, userPermissions) => {
    return requiredPermissions.reduce((result, currentValue) => result && userPermissions.includes(currentValue), true);
};

module.exports.authorize = (requiredPermissions) => async (req, res, next) => {
    //changes by authentication strategy
    const user = await User.getByLogin(req.cookies.user);

    if (!user) {
        res.status(401).send();
        return;
    }
    try {
        const profilePermissions = await Role.getPermissions(user.role);
        const operationPermitted = checkPermissions(requiredPermissions, profilePermissions);
        if (!operationPermitted) {
            res.status(401).send();
            return;
        }
        next();
    } catch (err) {
        res.send(500);
    }
};
