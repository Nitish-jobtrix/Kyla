import React from 'react'
import styled from "styled-components"

const StatsItem = ({ icon: IconComponent , title, data, bgColor, textColor }) => {
  return (
   <StatsContainer>
         <div className="iconBox" style={{background:bgColor, color:textColor}}>
         <h1><IconComponent /> </h1>
         </div>
         <div className="dataBox">
          <h1>{data}</h1>
          <p>{title}</p>
         </div>
   </StatsContainer>  
  )
}

export default StatsItem;

const StatsContainer=styled.div`
background:white;
display:flex;
align-item:center;
justify-content:center;
padding:25px;
width:23%;

justify-content: space-between;
margin-bottom:2%;
border-radius:5px;

.iconBox{
  padding:10px 20px;
  border-radius:20px;
  display:flex;
  align-items:center;
} 

.dataBox{
  text-align:right;
   white-space: nowrap;
} 

 @media screen and (max-width: 910px){
 width:48%; 
 }
 @media screen and (max-width: 500px){
 width:98%; 
 }
`