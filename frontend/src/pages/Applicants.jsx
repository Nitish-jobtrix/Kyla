import styled from 'styled-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ApplicantCard from '../component/ApplicantCard';

const Applicants = () => {
  const { jobId } = useParams();
  const [singleJob, setSingleJob] = useState([]);
  
  const fetchJob = async () => {
    const { data } = await axios.get(`/api/jobs/applicants/${jobId}`);
    console.log(data);
    setSingleJob(data);
  }
  //fetch the job by jobid and its applicants 
  useEffect(() => {
   
    fetchJob();
  }, [jobId])


  return (
   <Wrapper>
    <div className="job_details gradient">
    <h2>{singleJob?.title}</h2> 
    <p>{singleJob?.jobMode}</p>
    <p>{singleJob?.location}</p>
   
    </div>

    <div className="applicants">
    <h2>Applicants</h2>
    <div className="application_header">
    <p>Name</p>
     <p>Email</p>
     <p>Resume</p>
     <p>Applied Date</p>
     <p>Status</p> 
    </div>
    <hr />
     {singleJob?.applications?.map((app,index)=>{
      return <ApplicantCard key={index} app={app} fetchJob={fetchJob} jobId={jobId} shortlisted={false} /> 
     })}
    </div>
   </Wrapper>
  )
}

export default Applicants;

const Wrapper=styled.div`
h2,h3{
  color:#644343;
}

.application_header{
  display:flex;
  font-weight:bold;
 
  p{
    width:20%;   
  }
}

.applicants{
  padding:20px 10px;
  padding:20px 10px;

  h2{margin-bottom:10px;}
}
.job_details{
  padding:40px 50px ;
  border-radius:20px;
}

`

