const express = require('express');
const uploadMiddleware = require("../middleware/MulterMiddleware");
const router = express.Router();
const { applyForJob ,uploadResume } = require("../controllers/companyUserController")

const { isAuthenticated } = require('../middleware/companyUserAuth');

//  /api/jobs/candidate/uploadresume------ route to apply for a job  
router.post('/jobs/:companyName/user/jobhistory', isAuthenticated,applyForJob);  

//  /api/jobs/candidate/uploadresume------ route to upload resume     
router.post("/jobs/candidate/uploadresume",isAuthenticated, uploadMiddleware.single("file"),uploadResume);

module.exports = router;

