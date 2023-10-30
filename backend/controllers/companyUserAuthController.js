const CompanyUser = require('../models/companyUserModel');
const ErrorResponse = require('../utils/errorResponse');

// api/jobs/signup
exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await CompanyUser.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("User already registred", 400));
    }
    try {
        const user = await CompanyUser.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}


// api/jobs/signin
exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
  
        //validation
        if (!email) {
            return next(new ErrorResponse("please add an email", 403));
        }
        if (!password) {
            return next(new ErrorResponse("please add a password", 403));
        }

        //check user email
        const user = await CompanyUser.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("invalid credentials", 400));
        }
        //check password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("invalid credentials", 400));
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
}

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
        .status(codeStatus)
        .cookie('usertoken', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .json({
            success: true
        })
}


// log out
exports.logout = (req, res, next) => {
   
    res.clearCookie('usertoken');
    res.status(200).json({
        success: true,
        message: "logged out" 
    })
}


// user profile
exports.userProfile = async (req, res, next) => {

    const user = await CompanyUser.findById(req.user.id).select('-password');

    res.status(200).json({
        success: true,
        user
    })
}




