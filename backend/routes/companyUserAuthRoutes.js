const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile } = require('../controllers/companyUserAuthController');
const { isAuthenticated } = require('../middleware/companyUserAuth');


//auth routes
// /api/signup

router.post('/jobs/signup', signup);
// /api/signin
router.post('/jobs/signin', signin);
// /api/logout
router.get('/jobs/logout', logout);  
// /api/me
router.get('/jobs/me', isAuthenticated, userProfile);

module.exports = router;