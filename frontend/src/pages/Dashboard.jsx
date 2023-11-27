import React from 'react'
import styled from "styled-components";
import StatsItem from '../component/StatsItem';
import {PiSuitcaseSimpleBold} from "react-icons/pi";
import {HiDocumentSearch} from "react-icons/hi";
import {BsFillBookmarkFill} from "react-icons/bs";
import {FiUsers} from "react-icons/fi";
import { FcBriefcase } from "react-icons/fc";
import notificationData from '../constants/notificationData';
import ChartComponent from '../component/ChartComponent';

const Dashboard = () => {
  return (
    <div>
      <h1>Application Statistics</h1>
      <br />
        <ApplicationStats>
            <StatsItem icon={PiSuitcaseSimpleBold} bgColor="#e8f0fa" textColor="blue" title="Posted Jobs" data="10"/>
            <StatsItem icon={HiDocumentSearch} bgColor="#fbeae9" textColor="red" title="Application" data="10" />
            <StatsItem icon={BsFillBookmarkFill} bgColor="#fef6e5" textColor="orange" title="Shortlisted" data="10" />
            <StatsItem icon={FiUsers} bgColor="#eaf6ed" textColor="green" title="Users" data="10" />
           
        </ApplicationStats>
        
        <GraphContainer>
            <ChartComponent />
            <div className="notifications scroll_container">
              <h3>Notifications</h3>
            {
              notificationData.map((item,index)=>{
                return <NotificationItem className='gradient' key={index}>
                  <div className="icon_container">
                  <FcBriefcase />
                  </div>
                  <div className="text_container">
                            <p><i>{item.postedAt}</i></p>                   
                            <p style={{color:"#585858"}}>{item.message}</p>                   
                            <p>{item.jobTitle}</p>                   
                  </div>
                       </NotificationItem>
              })
            }
            </div>
        </GraphContainer>
  
    </div>
  )
}

export default Dashboard;

const ApplicationStats=styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`

const GraphContainer=styled.div`
width:100%;
display:flex;
column-gap:2%;

.notifications{
  font-size:13px;
  border-radius:10px;
  height:350px;
  overflow:auto;
  width:29%;   
  display:flex;
  flex-direction:column;
  row-gap:10px; 
  padding:20px 10px;
  background:white;
  }

`

const NotificationItem=styled.div`
padding:10px;
border-radius:10px;
display:flex;
align-items:center;

.icon_container{
height:40px;
width:40px;
background:#da8c8c;
margin-right:10px;
border-radius:5px;
font-size:30px;
display:flex; 
align-items:center;
justify-content:center;
}



`