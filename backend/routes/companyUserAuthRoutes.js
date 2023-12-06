const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile } = require('../controllers/companyUserAuthController');
const { isAuthenticated } = require('../middleware/companyUserAuth');

//candidate auth routes

// /api/jobs/signup------this route is for the candidate signup 
router.post('/jobs/signup', signup);

// /api/jobs/signin-------this route is for candidate sign in
router.post('/jobs/signin', signin);

// /api/jobs/logout--------this route is to logout 
router.get('/jobs/logout', logout); 

// /api/jobs/me-----this route is for fetching the profile of the candidates 
router.get('/jobs/me', isAuthenticated, userProfile);

module.exports = router;