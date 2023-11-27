import { useSelector } from 'react-redux';
import styled from 'styled-components';



const UserInfoDashboard = () => {
    const { companyUser } = useSelector(state => state.companyUserProfile);
  
   
    return (
       <Wrapper>
        
        <ProfileItem className="gradient">
            <h3>Username</h3>
            <p>{companyUser?.firstName}</p>
        </ProfileItem>
        <ProfileItem className="gradient">
            <h3>Email</h3>
            <p>{companyUser?.email}</p>
        </ProfileItem>
       </Wrapper>

    );
    
}

export default UserInfoDashboard;

const Wrapper=styled.div`  
display:flex;
column-gap:2%;
flex-wrap:wrap;

` 
const ProfileItem=styled.div`  
padding:20px;
width:48%;
border-radius:10px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

@media screen and (max-width:750px){
    width:100%;
    margin-top:10px;
}
` 


