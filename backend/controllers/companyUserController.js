const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const CompanyUser=require("../models/companyUserModel");
const Job = require("../models/jobModel");


const path = require("path");
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


//apply for a job
exports.createCompanyUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location, companyName, jobId } = req.body;

    try {
        const currentUser = await CompanyUser.findOne({ _id: req.user._id });

        if (!currentUser) {
            return next(new ErrorResponse('You must log In', 401));
        } else if (currentUser.jobsIdHistory.includes(jobId)) {
            return next(new ErrorResponse('You have already applied!', 409));
        } else {
            const addJobHistory = {
                title,
                description,
                salary,
                location,
                user: req.user._id,
                companyName: companyName,
            };

            // Update the job model with the user's application
            const job = await Job.findOneAndUpdate(
                { _id: jobId },
                {
                    $push: {
                        applications: {
                            user: req.user._id,
                            appliedAt: new Date(),
                            // Add additional application information if needed
                        },
                    },
                },
                { new: true }
            );

            // Update the user's job history
            currentUser.jobsHistory.push(addJobHistory);
            currentUser.jobsIdHistory.push(jobId);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            currentUser,
        });
        next();
    } catch (error) {
        return next(error);
    }
};

//resume controller

exports.uploadResume = async (req, res, next) => {
try {
 
    const user = await CompanyUser.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    const file = req.file.path; 
    user.file =  file || user.file;
    await user.save();
    res.status(201).json( user );
} catch (error) {
    return next(error);
}
}



exports.downloadResume = async (req, res, next) => {
try {
    const user = await CompanyUser.findById(req.user.id).select('-password');   
    if (!user) {
      return next(new Error("No User found"));
    }
    const file = user.file;
    const filePath = path.join(__dirname, `../../${file}`);
    res.download(filePath);
} catch (error) {
    return next(error); 
}
}




