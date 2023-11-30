import React from 'react'
import styled from "styled-components"
const LinkedinXray = () => {
  return (
    <Wrapper>
    <QueryContainer>
      <div className="items">
        <p>Location</p>
        <input type="text" placeholder="Eg. Delhi, Mumbai" />
      </div>
      <div className="items">
        <p>Job Title</p>
        <input type="text" placeholder="Eg. Software Engineer" />
      </div>
      <div className="items">
        <p>Keywords </p>
        <input type="text" placeholder="Eg. Software Engineer" />
      </div>
      <div className="items">
        <p>Job Title</p>
        <input type="text" placeholder="Enter Job Title" />
      </div>
      <div className="items">
        <p>Education</p>
        <input type="text" placeholder="Enter Education" />
      </div>
      <div className="items">
        <p>Current Employer</p>
        <input type="text" placeholder="Eg. Jobtrix, Google" />
      </div>

    </QueryContainer>
    
    <div className="searchBox">
    <Button className='bright_gradient'>Search Profiles</Button>
    </div>

    </Wrapper>
  )
} 

export default LinkedinXray;

const Wrapper=styled.div`
width:100%;
.searchBox{
  padding:20px;
}
`

const QueryContainer = styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
.items{
width:50%;
padding:20px;
}

input{
  margin-top:10px;
  padding:10px;
  width:100%;
  border:none;
  outline:none;
}

` 
const Button=styled.button`
padding:10px;
border:none;
width:100%;
cursor:pointer;
color:white;
font-weight:bold;
font-size:15px;
`
