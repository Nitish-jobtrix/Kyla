const express = require('express');
const uploadMiddleware = require("../middleware/MulterMiddleware");
const router = express.Router();
const { createCompanyUserJobsHistory ,uploadResume,downloadResume } = require("../controllers/companyUserController")

const { isAuthenticated } = require('../middleware/companyUserAuth');

router.post('/jobs/:companyName/user/jobhistory', isAuthenticated,createCompanyUserJobsHistory);  
router.post("/jobs/candidate/uploadresume",isAuthenticated, uploadMiddleware.single("file"),uploadResume);
router.get("/jobs/candidate/downloadresume",isAuthenticated, downloadResume);   //it basically generates link to access the docs


module.exports = router;

