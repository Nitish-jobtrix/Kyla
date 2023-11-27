import React, {  useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

const UserResumeUpload = () => {
  const { companyUser } = useSelector(state => state.companyUserProfile);
  const fileInputRef = useRef(null);
  const [resumeUpload,setResumeUpload]=useState(false); 

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);
      
     
      const res = await axios.post(
        "/api/jobs/candidate/uploadresume",
        formData
      );
      if(res.status===201){
        setResumeUpload(true);
        toast.success("Resume uploaded successfully!");
      } 
      else toast.error("some error occurred");
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `/api/jobs/candidate/downloadresume`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      console.log(link.href);
      window.open(link.href);
      // link.download = "file.pdf";
      // link.click();
    } catch (error) {
      console.log(error);
    } 
  };


  return (
    <Wrapper>
       <h1>upload your resume</h1>
       <div className="resume-desc">
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam ut saepe repellendus quae, dolorum excepturi! Totam sunt est eius nesciunt adipisci esse, officiis beatae unde molestiae, quasi doloribus omnis. Ducimus.
       </div>       
        <input className="custom-file-input" type="file" ref={fileInputRef} />
        <Button className="bright_gradient" onClick={addItem}>Upload new resume</Button>
    
      <div className="uploaded_resume gradient">
       <h2>uploaded Resumes</h2>
      
       {(companyUser?.file || resumeUpload===true) ? <Button className="bright_gradient" onClick={downloadFile}>view current resume </Button>:<p>No resume exits</p>}
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