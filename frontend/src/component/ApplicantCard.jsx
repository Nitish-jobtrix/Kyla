import styled from "styled-components"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';



const ApplicantCard = ({app,jobId,fetchJob,shortlisted}) => {
    const appliedDate = new Date(app?.appliedAt);

    // Format the date using toLocaleDateString with options
    const formattedDate = appliedDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  // State to manage the selected status
  const [selectedStatus, setSelectedStatus] = useState(app?.status); 
  const [fileUrl,setFileUrl]=useState("");

  // Handler function for status change     
  const handleStatusChange = (event) => {   
    setSelectedStatus(event.target.value);
  };
 
  const getResumeLink = async () => {
    try {
        if(app?.user?.file){
      const res = await axios.post( `/api/jobs/applicant/resume`,{file:app.user.file}, { responseType: "blob" });
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      window.open(link.href);
        }
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
        const filePath = app?.file;
        setFilePath(filePath); 
      } catch (error) {
        console.log(error);
      } 
    };
    if(app){
    getFilePath();
    }
  }, [app])
  

  // useEffect to make API call when selectedStatus changes
  useEffect(() => {
   
    if(app?.status && selectedStatus!==app?.status){
    const updateStatus = async () => {
      try {
        const applicantId=app?._id;

        const res = await axios.put(`/api/jobs/updateApplicationStatus/${jobId}/${applicantId}` , {
          newStatus: selectedStatus,
        });
        toast.success("Status updated successfully!");
      fetchJob();
      } catch (error) {
        console.error(error);
        toast.error("Some error occurred!");
      }
    };
    updateStatus();
  }
  }, [selectedStatus]);  


  return (
    <CardWrapper>
     <p>{app?.user?.firstName}</p>
     <p>{app?.user?.email}</p>
     
     <p  className="view_btn"><a href={fileUrl} rel="noreferrer" target="_blank">view</a></p>
     <p>{formattedDate}</p>

{!shortlisted &&

     <select value={selectedStatus} className="status" onChange={handleStatusChange}>
        <option value="shortlisted">Shortlisted</option>
        <option value="rejected">Rejected</option>
        <option value="inReview">In Review</option>
      </select>

}

    </CardWrapper>   
  )
}

export default ApplicantCard;

const CardWrapper=styled.div`
display:flex;
margin-top:10px;
p{
    width:20%; 
}

.status{
    border: none;
    padding: 2px 10px;
    border-radius: 5px;
    font-weight:bold;
    color:#494848;
}
.view_btn{
    color:purple;
    font-weight:bold;
    cursor:pointer;
}

`  