import axios from 'axios';
import { toast } from 'react-toastify'
import {
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
    REGISTER_JOB_FAIL,
    REGISTER_JOB_REQUEST,
    REGISTER_JOB_SUCCESS,
    DELETE_JOB_FAIL,
    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    EDIT_JOB_FAIL,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_REQUEST
} from "../constants/jobconstant"


export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '',companyName) => async (dispatch) => {
   
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/jobs/show/?companyName=${companyName}&pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single job action
export const jobLoadSingleAction = (jobId) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/job/${jobId}`);
        dispatch({
            type: JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}

// register job action
export const registerAjobAction = (job) => async (dispatch) => {
    dispatch({ type: REGISTER_JOB_REQUEST })

    try {
        const { data } = await axios.post("/api/job/create", job)
        dispatch({
            type: REGISTER_JOB_SUCCESS,
            payload: data
        })
        toast.success("Job created successfully");


    } catch (error) {
        dispatch({
            type: REGISTER_JOB_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}

// edit job action
export const editAjobAction = (job,jobId) => async (dispatch) => {
    dispatch({ type: EDIT_JOB_REQUEST })

    try {
        const { data } = await axios.put(`/api/job/update/${jobId}`, job)
        dispatch({
            type: EDIT_JOB_SUCCESS,
            payload: data
        })
        toast.success("Job edited successfully");


    } catch (error) {
        dispatch({
            type: EDIT_JOB_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}
// delete job action
export const deleteAjobAction = (jobId) => async (dispatch) => {
    dispatch({ type: DELETE_JOB_REQUEST })

    try {
        const response = await axios.delete(`/api/jobs/${jobId}`);
        const {data}=response;
        if(response.status===404) toast.error("Job id does not exist");
        else{
            dispatch({
            type: DELETE_JOB_SUCCESS,
            payload: data
        })
        toast.success("Job Deleted successfully");

    }
    } catch (error) {
      
        dispatch({
            type: DELETE_JOB_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}