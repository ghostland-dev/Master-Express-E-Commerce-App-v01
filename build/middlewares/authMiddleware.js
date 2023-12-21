"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = exports.authenticateJwt = void 0;
const express_jwt_1 = require("express-jwt");
const constants_1 = require("../utils/constants");
exports.authenticateJwt = (0, express_jwt_1.expressjwt)({
    secret: constants_1.SECRET_KEY,
    algorithms: ['HS256'],
    getToken: (req) => { var _a; return (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; },
});
const checkRoles = (roles) => (req, res, next) => {
    const utilisateurRoles = req.user.roles.split(',');
    if (roles.some((role) => utilisateurRoles.includes(role))) {
        next();
    }
    else {
        res.json({ codeStatus: 403, message: 'Unauthorized' });
    }
};
exports.checkRoles = checkRoles;
