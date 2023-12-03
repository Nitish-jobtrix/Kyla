import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {

    const {  companyUserInfo } = useSelector(state => state.companyUserSignIn);
    return companyUserInfo ? children : <Navigate to="/jobs/candidate/login" />;
}

export default UserRoute