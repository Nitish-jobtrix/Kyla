const JobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');

//create job category
exports.createJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id,
            companyName:req.user.companyName
        });
        res.status(201).json({
            success: true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}


//all jobs category
exports.allJobsType = async (req, res, next) => {
    try {
        const companyName=req.query.companyName;
        const jobT = await JobType.find({companyName:companyName}).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}

//update job type
exports.updateJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findById(req.params.type_id);
        jobT.jobTypeName=req.body.jobTypeName;

        console.log(req.body.jobTypeName);
        await jobT.save();
        res.status(200).json({
            success: true,
            jobT
        })
    } catch (error) {
        console.log(error);
        next(error);

    }
}


//delete job type
exports.deleteJobType = async (req, res, next) => {
    try {
        const jobT = await JobType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Job type deleted"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}












