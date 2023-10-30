import axios from 'axios';
import { toast } from "react-toastify";
import {
    COMPANY_USER_APPLY_JOB_FAIL,
    COMPANY_USER_APPLY_JOB_REQUEST,
    COMPANY_USER_APPLY_JOB_SUCCESS,

    COMPANY_USER_LOAD_FAIL,
    COMPANY_USER_LOAD_REQUEST,
    COMPANY_USER_LOAD_SUCCESS,

    COMPANY_USER_LOGOUT_FAIL,
    COMPANY_USER_LOGOUT_REQUEST,
    COMPANY_USER_LOGOUT_SUCCESS,

    COMPANY_USER_SIGNIN_FAIL,
    COMPANY_USER_SIGNIN_REQUEST,
    COMPANY_USER_SIGNIN_SUCCESS,

    COMPANY_USER_SIGNUP_FAIL,
    COMPANY_USER_SIGNUP_REQUEST,
    COMPANY_USER_SIGNUP_SUCCESS,
} from '../constants/companyUserConstant';



export const companyUserSignInAction = (user) => async (dispatch) => {
    dispatch({ type: COMPANY_USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post(`/api/jobs/signin`, user);  //for signing in of user 
        localStorage.setItem(`companyUserInfo`, JSON.stringify(data));   //storing data in browsers local storage
        dispatch({
            type: COMPANY_USER_SIGNIN_SUCCESS,   
            payload: data
        });
        toast.success("User Login Successfully!");
    } catch (error) {
        dispatch({
            type: COMPANY_USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// company  user sign up action
export const companyUserSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: COMPANY_USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post(`/api/jobs/signup`, user);

        dispatch({
            type:  COMPANY_USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("User Register Successfully!");
    } catch (error) {
        dispatch({
            type:  COMPANY_USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//log out action
export const companyUserLogoutAction = (user) => async (dispatch) => {
    dispatch({ type: COMPANY_USER_LOGOUT_REQUEST });
    try {
        localStorage.removeItem(`companyUserInfo`);
        const { data } = await axios.get(`/api/jobs/logout`);
        dispatch({
            type: COMPANY_USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("User Log out successfully!");
    } catch (error) {
        dispatch({
            type: COMPANY_USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
export const companyUserProfileAction = () => async (dispatch) => {
    dispatch({ type: COMPANY_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/jobs/me`);
        dispatch({
            type: COMPANY_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: COMPANY_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


//all user action  ......i think this is not needed by user of a specific job site 
// export const allUserAction = () => async (dispatch) => {
//     dispatch({ type: ALL_USER_LOAD_REQUEST });
//     try {
//         const { data } = await axios.get("/api/allusers");
//         dispatch({
//             type: ALL_USER_LOAD_SUCCESS,
//             payload: data
//         });

//     } catch (error) {
//         dispatch({
//             type: ALL_USER_LOAD_FAIL,
//             payload: error.response.data.error
//         });
//     }
// }

//user job apply action
export const comanyUserApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: COMPANY_USER_APPLY_JOB_REQUEST });
    try {
        const { data } = await axios.post(`/api/jobs/${job.companyName}/user/jobhistory`, job);

        dispatch({
            type: COMPANY_USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Applied Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: COMPANY_USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}