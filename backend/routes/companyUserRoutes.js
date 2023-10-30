const express = require('express');
const router = express.Router();
const { createCompanyUserJobsHistory  } = require("../controllers/companyUserController")

const { isAuthenticated } = require('../middleware/companyUserAuth');


//user routes

// /api/allusers

// router.get('/user/:id', isAuthenticated, singleUser);
// // /api/user/edit/id
// router.put('/user/edit/:id', isAuthenticated, editUser);
// // /api/admin/user/delete/id
// router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
// /api/user/jobhistory
router.post('/jobs/:companyName/user/jobhistory', isAuthenticated,createCompanyUserJobsHistory);  // this is apply for job route




module.exports = router;