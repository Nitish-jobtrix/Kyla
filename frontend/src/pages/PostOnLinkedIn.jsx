import React, { useEffect, useState } from 'react';
// import { LinkedInApi, NodeServer } from './config';
import axios from 'axios';

function PostOnLinkedIn() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [articleContent, setArticleContent] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const getCodeFromWindowURL = (url) => {
    const popupWindowURL = new URL(url);
    return popupWindowURL.searchParams.get("code");
  };

  const handlePostMessage = (event) => {
    if (event.data.type === 'code') {
      const { code } = event.data;
       getAccessCode(code);
     
      // getUserCredentials(code);
    }
  };

  const getAccessCode= async(authorizationCode)=>{
    try {
      const response=await axios.post('/api/jobs/linkedin/auth', {
        authorizationCode: authorizationCode
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // console.log(response); // Process the response data as needed
      localStorage.setItem('accessToken', response.data);
      setAccessToken(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }

  const showPopup = () => {
   
    const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77lhj88l9eyjwc&scope=openid%20profile%20email%20w_member_social&state=123456&redirect_uri=http://localhost:3000/linkedin/post`;
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      oauthUrl,
      'Linkedin',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
        width +
        ', height=' +
        height +
        ', top=' +
        top +
        ', left=' +
        left
    );
  };

  // const getUserCredentials = (code) => {
  //   axios
  //     .get(`${NodeServer.baseURL}${NodeServer.getUserCredentials}?code=${code}`)
  //     .then((res) => {
  //       const userData = res.data;
  //       setUser(userData);
  //       setLoggedIn(true);
  //       // Do something with userData
  //     });
  // };


  // Post the article to LinkedIn
  const postArticle = async () => {
    // Get the user's access token from the local storage
    const accessToken = localStorage.getItem('accessToken');
  // console.log(accessToken);
  
  
    try {
      const response = await axios.post(`/api/jobs/linkedin/post-article/${accessToken}`, {
        articleContent: "we have a job offer"
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // console.log(response);
      if (response.status === 201) {
        // Article posted successfully
        alert('Article posted successfully');
      } else {
        // An error occurred
        alert('An error occurred while posting the article');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error as needed
    }
  };



  useEffect(() => {
    if (window.opener && window.opener !== window) {
      const code = getCodeFromWindowURL(window.location.href);
      window.opener.postMessage({ type: 'code', code: code }, '*');
      window.close();
    }
    window.addEventListener('message', handlePostMessage);

    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, []);

  return (
    <div>
      <h1>LinkedIn Article Poster</h1>

      {accessToken ? (
        <form onSubmit={postArticle}>
          <textarea
            placeholder="Write your article here..."
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
          />
          <button type="submit">Post Article</button>
        </form>
      ) : (
        <button onClick={showPopup}>Authenticate with LinkedIn</button>
      )}
    </div>
  );
}

export default PostOnLinkedIn;
