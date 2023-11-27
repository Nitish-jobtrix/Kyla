import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import { images } from '../constants';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';


const Profile = () => {

   const { user } = useSelector(state => state.userProfile); 
   const fileInputRef = useRef(null);
   const [userName,setUserName]=useState("");
   const [companyName,setCompanyName]=useState("");
   const [email,setEmail]=useState("");
   const [companyWebsite,setCompanyWebsite]=useState("");
   const [aboutCompany,setAboutCompany]=useState("");
   const [image,setImage]=useState("");
   const [previewPhoto,setPreviewPhoto]=useState("");
   useEffect(() => {
    if(user){
        setUserName(user.firstName);
        setCompanyName(user.companyName);
        setEmail(user.email);
        setCompanyWebsite(user.companyWebsite);
        setAboutCompany(user.aboutCompany);
    }
   
   }, [user])
   
   

  useEffect(() => {
    const getUserdata = async () => {
        try {
          const res = await axios.get(
            "/api/getuser",
            { responseType: "blob"} 
          );
          const blob = new Blob([res.data], { type: res.data.type });
          const link = document.createElement("a"); 
          link.href = window.URL.createObjectURL(blob);
          setImage(link.href);
        } catch (error) {
          console.log(error);
        }
      };
      getUserdata() ;
  }, [])
  



      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          console.log(fileInputRef.current.files[0]);
          const profileData = new FormData();
          profileData.append("file", fileInputRef.current.files[0]);
          profileData.append("userName", userName);
          profileData.append("companyName", companyName);
          profileData.append("email", email);
          profileData.append("companyWebsite", companyWebsite);
          profileData.append("aboutCompany", aboutCompany);
          
        
          const res = await axios.post("/api/user/updateprofile", profileData);
      
          if (res.status === 201) {
            toast.success("Profile updated successfully!");

          } else {
            toast.error("Some error occurred");
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <Wrapper> 
        <h2>My Profile</h2>
        <br />
        <div className="logo_container">
       { previewPhoto ? <img src={URL.createObjectURL(previewPhoto)} alt="preview_photo" /> :
            <img src={image?image:images.usericon} alt="companylogo" /> }
            <div>
                <input className="custom-file-input"  onChange={(e) => setPreviewPhoto(e.target.files[0])} type="file" ref={fileInputRef} />
               
            </div>
        </div> 
        <FormContainer onSubmit={handleSubmit}>
            <div className="items">
                <p>User Name</p>
                <input type="text" name='userName'  value={userName}  onChange={(e) => setUserName(e.target.value)} placeholder="Your Name" />
            </div>
            <div className="items">
                <p>Company Name</p>
                <input type="text" name='companyName'  value={companyName}  onChange={(e) => setCompanyName(e.target.value)} placeholder="Your company Name" />
            </div>
            <div className="items">
                <p>Email </p>
                <input type="text" name='email' value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="Eg. abc@gmail.com" />
            </div>
            <div className="items">
                <p>Company Website</p>
                <input type="text" name='companyWebsite' value={companyWebsite}  onChange={(e) => setCompanyWebsite(e.target.value)}  placeholder="http://companyName.in/" />
            </div>
            
            <div className="items textarea">
            <p>About Company</p>
            <ReactQuill placeholder='write about your company' name="about" theme="snow" value={aboutCompany}  onChange={(value) => setAboutCompany(value)} className='text_editor'/>
            </div>
            
            <button type='submit' className='gradient'>Save Profile</button>
            
        </FormContainer>
    
    </Wrapper>
  )
}

export default Profile;

const Wrapper=styled.div`
padding:20px;
width:100%;
background:white;

img{
    height:100px;
    width:100px;
    margin-right:10px;
}
.logo_container{
    display:flex;
    padding:10px;
    align-items:center;
    width:100%;
    
}

.logo_container div{
    display:flex;
    align-items:center;
}

button{
    background:#8e70a9;
    color:white;
    font-weight:bold;
}

@media screen and (max-width:500px){
    .logo_container div{
        flex-direction:column;
        align-items:flex-start;
        row-gap:10px;
    }
}

`

const FormContainer=styled.form`
width:100%;
display:flex;
flex-wrap:wrap;
column-gap:2%;
row-gap:20px;
margin-top:20px;
margin-bottom:20px;

.items{
width:48%;
}

input{
  margin-top:10px;
  border-radius:5px;
  background:#e6d4f5;
  padding:20px 10px;
  width:100%;
  border:none;
  outline:none;
}
.textarea{
    width:100%;
    height:500px;
}

.text_editor{
margin-top:10px;
    height:400px;
}

@media screen and (max-width:500px){
    .items{
     width:100%;   
    }
    column-gap:0%;
}

`