const express = require('express');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs, deleteJob ,showApplicants,getResumebyFile,updateApplicationStatus,getShortlistedCandidates} = require('../controllers/jobsController');
const { isAuthenticated } = require('../middleware/auth');



//jobs routes
 
// /api/job/create
router.post('/job/create', isAuthenticated, createJob);

// /api/job/id
router.get('/job/:id', singleJob);   

// /api/job/update/job_id
router.put('/job/update/:jobId', isAuthenticated, updateJob);

// /api/jobs/show
router.get('/jobs/show', showJobs); 

// /api/jobs/jobd
router.delete('/jobs/:jobId',deleteJob);

//  /api/jobs/applicants/jobId
router.get('/jobs/applicants/:jobId', showApplicants);

//  /api/jobs/applicants/jobId
router.get('/jobs/shortlistedCandidates/:jobId', getShortlistedCandidates);

// route for updating application status
router.put('/jobs/updateApplicationStatus/:jobId/:applicantId', updateApplicationStatus);

//get resume 
router.post('/jobs/applicant/resume', getResumebyFile);




module.exports = router; 


