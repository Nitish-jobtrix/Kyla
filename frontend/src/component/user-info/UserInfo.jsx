import React from 'react'
import './user-info.scss'
import usericon from "../../assets/images/usericon.png"


const UserInfo = ({ user }) => {
    return (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={usericon} alt="user icon" />
            </div>
            <div className="user-info__name">
                <span>{user?.firstName}</span>
            </div>
        </div>
    )
}

export default UserInfo
