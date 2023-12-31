const Job = require("../models/jobModel");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");
//create job
exports.createJob = async (req, res, next) => {
  

  try {
    
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      companyName: req.body.companyName,
      skills:req.body.skills,
      discloseSalary:req.body.discloseSalary,
      qualification:req.body.qualification,
      jobMode:req.body.jobMode,
    });
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};
//delete job
exports.deleteJob = async (req, res, next) => {
  const jobId = req.params.jobId;
  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(201).json({
      success: true,
      id:jobId ,
    });
  } catch (error) {
    next(error);
  }
};

//single job
exports.singleJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id, // Match the job by its id
    }).populate("jobType");
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.updateJob = async (req, res, next) => {

  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

     // Update the fields if they exist in the request body
      job.title = req.body.title || job.title;
      job.description =  req.body.description || job.description;
      job.salary =  req.body.salary || job.salary;
      job.location =  req.body.location || job.location;
      job.jobType =  req.body.jobType || job.jobType;
      job.skills=req.body.skills || job.skills;
      job.qualification=req.body.qualification || job.qualification;
      job.discloseSalary=req.body.discloseSalary || job.discloseSalary;
      job.jobMode=req.body.jobMode || job.jobMode;
      await job.save();

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.showJobs = async (req, res, next) => {
  const companyName = req.query.companyName;
  //enable search
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // filter jobs by category ids
  let ids = [];
  const jobTypeCategory = await JobType.find({}, { _id: 1 });
  jobTypeCategory.forEach((cat) => {
    ids.push(cat._id);
  });

  let cat = req.query.cat;
  let categ = cat !== "" ? cat : ids;

  //jobs by location
  let locations = [];
  const jobByLocation = await Job.find({}, { location: 1 });
  jobByLocation.forEach((val) => {
    locations.push(val.location);
  });
  let setUniqueLocation = [...new Set(locations)];
  let location = req.query.location;
  let locationFilter = location !== "" ? location : setUniqueLocation;

  //enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  //const count = await Job.find({}).estimatedDocumentCount();
  const count = await Job.find({
    ...keyword,
    jobType: categ,
    location: locationFilter,
  }).countDocuments();

  try {
    const jobs = await Job.find({
      ...keyword,
      jobType: categ,
      location: locationFilter,
      companyName: companyName,
    })
      .sort({ createdAt: -1 })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName")
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.status(200).json({
      success: true,
      jobs,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      setUniqueLocation,
    });
  } catch (error) {
    next(error);
  }
};

exports.showApplicants = async (req, res, next) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findById(jobId).populate({
      path: 'applications.user',
      match: {
        'applications.status': {
          $nin: ['rejected', 'shortlisted'] // Exclude 'rejected' and 'shortlisted' statuses
        }
      },
      select: 'firstName lastName file email', // include these only
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    job.applications = job.applications.filter(app => app.status !== 'rejected' && app.status !== 'shortlisted');

    res.status(200).json(job);
  } catch (error) {
    next(error); 
  }
};


exports.getShortlistedCandidates=async (req, res, next) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findById(jobId).populate({
      path: 'applications.user',
      match: {
        'applications.status': {
          $nin: ['rejected', 'inReview'] 
        }
      },
      select: 'firstName lastName file email',
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    job.applications = job.applications.filter(app => app.status !== 'rejected' && app.status !== 'inReview');

    res.status(200).json(job);
  } catch (error) {
    next(error); 
  }

}
exports.getResumebyFile=async (req, res, next) => {
  try { 
   const {file}=req.body;
      const filePath = path.join(__dirname, `../../${file}`);
      res.download(filePath);
  } catch (error) {
      return next(error); 
  }
  }

exports.updateApplicationStatus=async (req, res, next) => {
  try {
    const { jobId, applicantId } = req.params;
    const { newStatus } = req.body;

    // Find the job by jobId and update the application status
    const job = await Job.findOneAndUpdate(
      { _id: jobId, 'applications._id': applicantId },
      { $set: { 'applications.$.status': newStatus } },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ error: 'Job or applicant not found' });
    }

    res.json({ message: 'Application status updated successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  }

