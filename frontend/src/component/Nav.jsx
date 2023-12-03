import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { companyUserLogoutAction } from '../redux/actions/companyUserAction';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
  const [hasLogo,setLogo]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { companyName } = useParams();
  const { companyUserInfo } = useSelector(state => state.companyUserSignIn);
  const firstCharacter = companyName?.charAt(0).toUpperCase();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
 
        const url=`/api/jobs/verifycompany/${companyName}`;
        const {data} = await axios.get(url);
        if(!data.success) navigate("/pagenotfound");      
        setLogo(data?.hasLogo);
      } catch (error) {
        console.log(error);
      }
    };
  
if(companyName){
    fetchData();
}
  }, [location]);


  // log out user
  const logOutUser = () => {
    dispatch(companyUserLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate('/jobs/candidate/login');
    }, 500)
  }


  return (
    <Wrapper className='gradient'>
      <div className="leftnav navigation">
       {hasLogo ? <img className="company_logo" height={50} width={50} src={`/api/jobs/${companyName}/logo`} alt='company_logo' />:
       <h3>{firstCharacter}</h3>
       }
        <a href={`/jobs/${companyName}/about`}>About</a>
        <a href={`/jobs/${companyName}`}>Home</a>
      </div>
     
      <div className="rightnav navigation" >

        {!companyUserInfo ?
          <>
            <Button className="login-btn" onClick={() => navigate("/jobs/candidate/login")}>Login</Button>
            <Button onClick={() => navigate("/jobs/candidate/register")}>Register</Button>
          </> :
          <>
            <Button onClick={logOutUser}>Logout</Button>
            <FaUserCircle onClick={() => navigate("/jobs/candidate/dashboard")} />
          </>
        }
      </div>

    </Wrapper>
  )
}

export default Nav;

const Wrapper = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding:15px 10px;

.company_logo{
  border-radius:50%;
}
.navigation{
    display:flex;
    column-gap:10px;
    align-items:center;
    letter-spacing:1px;

    a{
        font-weight:bold;
      
        color:black;

        @media screen and (max-width:600px){
          font-size:15px;
        }
    }
}

.rightnav{
    color:white;
    svg{
        font-size:40px;
        cursor:pointer;
        color:purple;
    }
}

@media screen and (max-width:400px){
  .login-btn{
    display:none;
  }
}

`

const Button = styled.button`
padding:10px 15px;
background: #b17ce4;
border:none;
cursor:pointer;
border-radius:5px;
font-weight:bold;
color:white;
letter-spacing:1px;

font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

@media screen and (max-width:600px){
  font-size:15px;
  padding:10px 10px;
}
`