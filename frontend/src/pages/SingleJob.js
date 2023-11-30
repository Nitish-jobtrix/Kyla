import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../component/footer/Footer'
import Nav from '../component/Nav'
import { jobLoadSingleAction } from '../redux/actions/jobAction'
import {comanyUserApplyJobAction} from "../redux/actions/companyUserAction"
import styled from 'styled-components'


const SingleJob = () => {
   
    const dispatch = useDispatch();
    const { singleJob, loading } = useSelector(state => state.singleJob)
    const { id ,companyName} = useParams();
    useEffect(() => {
        dispatch(jobLoadSingleAction(id,companyName));
    }, [id]);

    const applyForAJob = () => {
        dispatch(comanyUserApplyJobAction({
            title: singleJob && singleJob.title,
            description: singleJob && singleJob.description,
            salary: singleJob && singleJob.salary,
            location: singleJob && singleJob.location,
            companyName:singleJob && singleJob.companyName,
            joAbId:singleJob && singleJob._id
        }))
    }

    return (
        <>
        <Nav />
     
       <Wrapper>
        <ApplyContainer> 
           <h2> {singleJob && singleJob.title}</h2>
           {singleJob?.discloseSalary && <p className='salary gradient'>  {singleJob && singleJob.salary} Lpa</p> }
           <p> {singleJob && singleJob.jobType ? singleJob.jobType.jobTypeName : "No category"}</p>
           <p> {singleJob && singleJob.location}, {singleJob?.jobMode}</p>
        
           <button onClick={applyForAJob} className='bright_gradient'>Apply for this Job</button>
        </ApplyContainer>
        <DescriptionContainer>
        <h2>Job Description</h2>
        <div className="description"  dangerouslySetInnerHTML={{ __html: singleJob?.description }} ></div>
        <br />
   
       
        <h2>Skills Required</h2>
        <div className='skills' >
         {singleJob?.skills.map((item,index)=>{
            return <p className='gradient single_skill' key={index}>{item}</p>
         })}

        </div>
        <br />
       
       
        <h2>Qualifications Required</h2>
        <div className="description"  dangerouslySetInnerHTML={{ __html: singleJob?.qualification }} ></div>
       
        </DescriptionContainer>
       </Wrapper>
      <Footer />
       </>
    )
}

export default SingleJob;

const Wrapper=styled.div`
display:flex;
column-gap:20px;
padding:100px;
background:#fafafa;


`
const ApplyContainer=styled.div`
width:30%;
align-self:flex-start;
background:white;
flex-direction:column;
padding:20px;
border-radius:10px;
display:flex;
row-gap:10px;
.salary{
    padding:5px;
    border-radius:5px; 
    align-self:flex-start;
}
button{
    color:white;
    font-weight:bold;
}

`

const DescriptionContainer=styled.div`
width:70%;
padding:20px;
background:white;
border-radius:10px;

.skills{
    display:flex;
    column-gap:10px;
    row-gap:5px;   
    flex-wrap:wrap; 
}
.single_skill{
    padding:5px 10px;
    border-radius:5px;
}
`