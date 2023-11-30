import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux'
import { jobTypeLoadAction } from '../redux/actions/jobTypeAction';
import { registerAjobAction } from '../redux/actions/jobAction';


const CreateJobPage = () => {
    const { user } = useSelector(state => state.userProfile);
    const { jobType } = useSelector(state => state.jobTypeAll);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [category, setCategory] = useState("");
    const [skills, setSkillsRequired] = useState([]);
    const [currentSkills,setCurrentSkills]=useState("");
    const [jobMode, setJobMode] = useState("");
    const [description, setDescription] = useState("");
    const [qualification, setQualification] = useState("");
    const [isDisclose, setDisclose] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        const companyName=user?.companyName;
         dispatch(jobTypeLoadAction(companyName));
         
    }, [user]);

    const handleClick = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
          setSkillsRequired(prevSkills => [...prevSkills, currentSkills]);
          setCurrentSkills("");
        }
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
     
      try{
      const obj={
        title,description,salary,location,jobType:category,jobMode,skills,qualification,discloseSalary:isDisclose,companyName:user?.companyName 
      
      }

      dispatch(registerAjobAction(obj));
      setTitle("");
      setCategory("");
      setLocation("");
      setSkillsRequired([]);
      setSalary("");
      setJobMode("");
      setDescription("");
      setQualification("");
    }
    catch(error){
        console.log(error);
    }
    };

    return (
        <Wrapper>
            <h2>Post a Job</h2>
            <br />

            <FormContainer onSubmit={handleSubmit}>
                <div className="items">
                    <p>Job Title</p>
                    <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the job title" />
                </div>

                <div className="items">
                    <p>Location</p>
                    <input type="text" name='location' value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Eg.Delhi,Mumbai" />
                </div>
                <div className="items">
                    <p>Salary</p>
                    <input type="text" name='salary' value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Enter salary of the job" />
                    <div className="disclose_box">
                        <span style={isDisclose === true ? { backgroundColor: "#a74cff", color: "white" } : {}} onClick={() => setDisclose(true)}>Disclose</span>
                        <span style={isDisclose === false ? { backgroundColor: "#a74cff", color: "white" } : {}} onClick={() => setDisclose(false)}>Hide</span>

                    </div>
                </div>
                <div className="items">
                    
                    <p>category</p>
            <select
                name="jobType"
                value={category}
                className="dropdown"
                onChange={(e)=>setCategory(e.target.value)}
            >
                <option value="" disabled>Select a job type</option>
                {jobType?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.jobTypeName}
                    </option>
                ))}
            </select>
                </div>

                <div className="items fullwidth">
                    <p>Key Skills Required</p>
                    <input type="text" name='companyWebsite' value={currentSkills} onKeyDown={handleClick} onChange={(e) => setCurrentSkills(e.target.value)} placeholder="write skill then press Enter" />
                    <div className="skills">
                        {skills.map((item,index)=>{
                            return <span key={index}>{item}</span>
                        })}
                    </div> 
                </div>
                <div className="items fullwidth">
                    <p>Mode of job</p>
                    <select
                name="jobType"
                value={jobMode}
                className="dropdown"
                onChange={(e)=>setJobMode(e.target.value)}
            >
                <option value="" disabled>Select a job Mode</option>
                <option value="onsite" >Onsite</option>
                <option value="hybrid" >Hybrid</option>
                <option value="remote">Remote</option>
                </select>
                </div>
                <div className="items textarea">
                    <p>Job Description</p>
                    <ReactQuill placeholder='write about your company' name="about" theme="snow" value={description} onChange={(value) => setDescription(value)} className='text_editor' />
                </div>

                <div className="items textarea">
                    <p>Qualifications Required</p>
                    <ReactQuill placeholder='write about your company' name="about" theme="snow" value={qualification} onChange={(value) => setQualification(value)} className='text_editor' />
                </div>

                <button type='submit' className='gradient'>Post Job</button>

            </FormContainer>

        </Wrapper>
    )
}

export default CreateJobPage;

const Wrapper = styled.div`
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

const FormContainer = styled.form`
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

.disclose_box{
    display:flex;
    column-gap:10px;
    margin-top:10px;
    span{
        background:#a69daf;   
        font-weight:bold;
        cursor:pointer;
        padding:5px;
        font-size:14px;
        border-radius:5px;
        color:white;
    }
}
.skills{
    display:flex;
    column-gap:10px;
    margin-top:10px;
    flex-wrap:wrap;
    span{
        background:#a080c0;  
        padding:5px;
        color:white;
        border-radius:5px;
        font-size:14px;
    }
}

.dropdown{
    max-height: 200px;
    overflow-y: auto;
    margin-top:10px;
    border-radius:5px;
    background:#e6d4f5;
    padding:20px 10px;
    width:100%;
    border:none;
    outline:none;
}
.dropdown option {
    height: 40px; /* Adjust the height of each option as needed */
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
    height:300px;
}
.fullwidth{
    width:100%;
}

.text_editor{
margin-top:10px;
    height:200px;
}

@media screen and (max-width:500px){
    .items{
     width:100%;   
    }
    column-gap:0%;
}

` 

