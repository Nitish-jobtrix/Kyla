const express = require('express');
const axios = require('axios');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs, deleteJob } = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//jobs routes
 
// /api/job/create
router.post('/job/create', isAuthenticated, createJob);
// /api/job/id
router.get('/job/:id', singleJob);   //here id is of job
// /api/job/update/job_id
router.put('/job/update/:jobId', isAuthenticated, updateJob);
// /api/jobs/show
router.get('/jobs/show', showJobs);
router.post('/jobs/linkedin/auth', async(req,res)=>{
try{
    const authorizationCode = req.body.authorizationCode;

    // Use the LinkedIn API to get the user's access token
    const response = await fetch('https://api.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=authorization_code&client_id=77lhj88l9eyjwc&client_secret=mX4Zs8mEzvXFobdo&redirect_uri=http://localhost:3000/linkedin/post&code=${authorizationCode}`
    });
  
    // Check the response status code
    if (response.status === 200) {
      // Access token retrieved successfully
      const accessToken = await response.json();
      console.log(accessToken);
res.send(accessToken.access_token);
} else {
  // An error occurred
  res.status(response.status).send('An error occurred while retrieving the access token');
}
}
catch(error){
  res.status(500).json({ message: 'Internal server error' }); 
}
});
  
// Create a new route to post an article to LinkedIn using the user's access token
router.post('/api/jobs/linkedin/post-article/:accessToken', async (req, res) => {
  // Get the article content from the request body
  const articleContent = req.body.articleContent;
  const accessToken=req.params.accessToken;

  try {
    await axios.post('https://api.linkedin.com/v2/ugcPosts', {
      author: 'urn:li:member:YOUR_MEMBER_ID',
      comment: articleContent,
      visibility: {
        'com.linkedin.ugc.MemberVisibility': 'PUBLIC'
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send('Post shared successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sharing post');
  }
});
 
async function getMemberID(accessToken) {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/people/~?format=json', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    });
    const memberData = response.data;
    const memberId = memberData.id;
    return memberId;
  } catch (error) {
    console.error(error);
    console.error('Error retrieving member ID');
    throw error;
  }
}
  

// /api/jobs/jobd
router.delete('/jobs/:jobId',deleteJob);


module.exports = router; 


