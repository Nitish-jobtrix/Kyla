import React, {  useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'


const UserResumeUpload = () => {
  const { companyUser } = useSelector(state => state.companyUserProfile);
  const fileInputRef = useRef(null);
  const [resumeUpload,setResumeUpload]=useState(false); 
  const [fileUrl,setFileUrl]=useState("");
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      
     
      const res = await axios.post(
        `/api/jobs/candidate/uploadresume`,
        formData
      );
     
      if(res.status===201){
        setResumeUpload(true);
        setFilePath(res.data.file);
        toast.success("Resume uploaded successfully!");
      } 
      else toast.error("some error occurred");
    } catch (error) {
      console.log(error);
    }
  };

  const setFilePath=(filePath)=>{
    const backendUrl = process.env.REACT_APP_BASE_URL;
    const fileUrl = `${backendUrl}/${filePath}`;
    const newFileUrl = fileUrl.replace('/backend', '');
    setFileUrl(newFileUrl);
  }
  useEffect(() => {
    const getFilePath = async (id) => {
      try {
        const filePath = companyUser?.file;
        setFilePath(filePath); 
      } catch (error) {
        console.log(error);
      } 
    };
    if(companyUser){
    getFilePath();
    }
  }, [companyUser])
  



  return (
    <Wrapper>
       <h1>upload your resume</h1>
       <div className="resume-desc">
       Upload your resume to apply for exciting job opportunities, Make sure your resume highlights your skills and experiences.We look forward to reviewing your application and connecting with you.
       </div>       
        <input className="custom-file-input" type="file" ref={fileInputRef} />
        <Button className="bright_gradient" onClick={addItem}>Upload new resume</Button> 
    
      <div className="uploaded_resume gradient">
       <h2>uploaded Resumes</h2>
      
       {(companyUser?.file || resumeUpload===true) ? <a  href={fileUrl} rel="noreferrer" target="_blank"><Button className="bright_gradient">view current resume</Button> </a>:<p>No resume exits</p>}
       </div>
    </Wrapper>
  );
};

export default UserResumeUpload;

const Wrapper=styled.div`
color:black; 
padding:20px;
display:flex;

flex-direction:column;
row-gap:20px;


.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Select some files';
  display: inline-block;
  border: 1px solid #999;
  padding: 5px 8px;
  outline: none;
  -webkit-user-select: none;
  cursor: pointer;
}
.custom-file-input:hover::before {
  border-color: black;
}

.uploaded_resume{
padding:20px 10px;
border-radius:10px;
display:flex;
flex-direction:column;
row-gap:10px;
}
h2{
  color:#494949;
}

`

const Button=styled.button`
align-self:flex-start;
font-weight:bold;
padding:10px 15px;
color:white;
`