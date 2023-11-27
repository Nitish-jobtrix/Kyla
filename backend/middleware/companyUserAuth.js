const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const CompanyUser = require("../models/companyUserModel"); 

// check is user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { usertoken } = req.cookies;

    if (!usertoken) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(usertoken, process.env.JWT_SECRET);
        req.user = await CompanyUser.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
}