import React from 'react'
import './topnav.scss'
import UserInfo from '../user-info/UserInfo'
import { useSelector } from 'react-redux'
import styled from "styled-components"

const TopNav = () => {
    const { user } = useSelector(state => state.userProfile);

    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }
    const handleClick = () => {
        if (user && user.companyName) {
            const url = `/jobs/${user.companyName}`;
            // Open the link in a new tab
            window.open(url, '_blank');
        }
    }

    return (
        <div className='topnav'>
            <UserInfo user={user} />
            <div className='right_topnav'>
                <Button onClick={handleClick}>Job Panel</Button>
                <div className="sidebar-toggle" onClick={openSidebar}>
                    <i className='bx bx-menu-alt-right'></i>
                </div>
            </div>
        </div>
    )
}

export default TopNav;


const Button = styled.button`
padding:10px 20px;
background:#8e70a9;
color:white;
letter-spacing:1px;
border-radius:5px;
border:none;
cursor:pointer;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
font-family:Verdana, Geneva, Tahoma, sans-serif;
font-weight:bold;

`
