const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const CompanyUser=require("../models/companyUserModel");


//show single user
exports.singleUser = async (req, res, next) => {     //i have to change it hahahahahaha....
    try {
        const user = await CompanyUser.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}


//edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();

    } catch (error) {
        return next(error);
    }
}

//delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await CompanyUser.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
        next();

    } catch (error) {
        return next(error);
    }
}


//jobs history
exports.createCompanyUserJobsHistory = async (req, res, next) => {
    // console.log(req.user);
    const { title, description, salary, location,companyName,jobId } = req.body;
    

    try {
        const currentUser = await CompanyUser.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse("You must log In", 401));
        } 
        else if(currentUser.jobsIdHistory.includes(jobId))  return next(new ErrorResponse("You have already applied!", 409));
        else {
            const addJobHistory = {
                title,
                description,
                salary,
                location,
                user: req.user._id,
                companyName:companyName
            }
            currentUser.jobsHistory.push(addJobHistory);
            currentUser.jobsIdHistory.push(jobId);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}








