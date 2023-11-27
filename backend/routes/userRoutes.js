const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, verifyCompany ,updateProfile,getUser, getCompanyData } = require('../controllers/userController');
const { isAuthenticated  } = require('../middleware/auth');
const logoMulterMiddleware = require("../middleware/logoMulterMiddleware");

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
router.post('/user/updateprofile', isAuthenticated,logoMulterMiddleware.single("file"), updateProfile); 


//to check if a company exist or not 
router.get("/jobs/verifycompany/:companyName",verifyCompany);

//to get company data  ///used in about section 
router.get("/jobs/companydata/:companyName",getCompanyData);

//used to get proper link 
router.get("/getuser",isAuthenticated,getUser);



module.exports = router;