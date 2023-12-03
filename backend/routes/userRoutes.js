const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, verifyCompany ,updateProfile,getUser, getCompanyData,userPhotoController,companyLogoController } = require('../controllers/userController');
const { isAuthenticated  } = require('../middleware/auth');
const logoMulterMiddleware = require("../middleware/logoMulterMiddleware");
const formidable = require("express-formidable");
//user routes
// /api/allusers

router.get('/jobs/:companyName/allusers', isAuthenticated, allUsers);
// /api/user/id
router.get('/user/:id', isAuthenticated, singleUser);
// /api/user/edit/id
router.put('/user/edit/:id', isAuthenticated, editUser);
// /api/admin/user/delete/id 
router.delete('/admin/user/delete/:id', isAuthenticated, deleteUser);

//uppdate user profile
// router.post('/user/updateprofile', isAuthenticated,logoMulterMiddleware.single("file"), updateProfile); 
router.post('/user/updateprofile', isAuthenticated,  formidable(), updateProfile); 


//to check if a company exist or not 
router.get("/jobs/verifycompany/:companyName",verifyCompany);

//to get logo by just the company name 
router.get("/jobs/:companyName/logo",companyLogoController);


//to get company data  ///used in about section 
router.get("/jobs/companydata/:companyName",getCompanyData);

//used to get proper link 
router.get("/getuser",isAuthenticated,getUser);

//get logo
router.get("/user/getlogo/:uid", userPhotoController);

module.exports = router;