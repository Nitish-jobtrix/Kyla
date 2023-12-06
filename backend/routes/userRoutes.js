const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, verifyCompany ,updateProfile,getUser, getCompanyData,userPhotoController,companyLogoController } = require('../controllers/userController');
const { isAuthenticated  } = require('../middleware/auth');
const formidable = require("express-formidable");
//user routes

// /api/jobs/companyName/allusers-----route to get all the users of a particular company
router.get('/jobs/:companyName/allusers', isAuthenticated, allUsers);

// /api/user/id -------- route to get user  details using id 
router.get('/user/:id', isAuthenticated, singleUser);

// /api/admin/user/delete/id ------route for updating the recruiter profile
router.delete('/admin/user/delete/:id', isAuthenticated, deleteUser);

// /api/user/updateprofile------route for updating the recruiter profile
router.post('/user/updateprofile', isAuthenticated,  formidable(), updateProfile); 

// /api/jobs/verifycompany/companyName ------- route to verify if company exists or not 
router.get("/jobs/verifycompany/:companyName",verifyCompany);

// /api/jobs/companyName/logo ------- route to get the logo of the company 
router.get("/jobs/:companyName/logo",companyLogoController);

// /api/jobs/companydata/companyName ------- route to get the company details using companyName this is not a efficient way use slug instead  
router.get("/jobs/companydata/:companyName",getCompanyData);


router.get("/getuser",isAuthenticated,getUser);

//get logo
router.get("/user/getlogo/:uid", userPhotoController);

module.exports = router;