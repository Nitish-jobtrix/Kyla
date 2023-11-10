import {
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_RESET,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_RESET,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
    REGISTER_JOB_FAIL,
    REGISTER_JOB_REQUEST,
    REGISTER_JOB_RESET,
    REGISTER_JOB_SUCCESS,
    DELETE_JOB_FAIL,
    DELETE_JOB_REQUEST,
    DELETE_JOB_RESET,
    DELETE_JOB_SUCCESS,
    EDIT_JOB_FAIL,
    EDIT_JOB_REQUEST,
    EDIT_JOB_RESET,
    EDIT_JOB_SUCCESS
} from "../constants/jobconstant"


export const loadJobReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {
        case JOB_LOAD_REQUEST:
            return { loading: true }
        case JOB_LOAD_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
                setUniqueLocation: action.payload.setUniqueLocation,
                jobs: action.payload.jobs
            }
        case JOB_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case JOB_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// single job reducer
export const loadJobSingleReducer = (state = { job: {} }, action) => {
    switch (action.type) {
        case JOB_LOAD_SINGLE_REQUEST:
            return { loading: true }
        case JOB_LOAD_SINGLE_SUCCESS:
            return {

                loading: false,
                success: action.payload.success,
                singleJob: action.payload.job,

            }
        case JOB_LOAD_SINGLE_FAIL:
            return { loading: false, error: action.payload }
        case JOB_LOAD_SINGLE_RESET:
            return {}
        default:
            return state;
    }

}

//Registred job;
export const registerAjobReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_JOB_REQUEST:
            return { loading: true }
        case REGISTER_JOB_SUCCESS:
          
            return {
                loading: false,
                job: action.payload,
            }
        case REGISTER_JOB_FAIL:
            return { loading: false, error: action.payload }
        case REGISTER_JOB_RESET:
            return {}
        default:
            return state;
    }

}

//updated job;
export const editAjobReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_JOB_REQUEST:
            return { loading: true }
        case EDIT_JOB_SUCCESS:
          
            return {
                loading: false,
                job: action.payload,
            }
        case EDIT_JOB_FAIL:
            return { loading: false, error: action.payload }
        case EDIT_JOB_RESET:
            return {}
        default:
            return state;
    }

}
//Delete job;
export const deleteAjobReducer = (state = { jobs: [] }, action)  => {
    switch (action.type) {
        case DELETE_JOB_REQUEST:
            return { loading: true }
        case DELETE_JOB_SUCCESS:
            
            return {
                loading: false,
            }
        case DELETE_JOB_FAIL:
                return { loading: false, error: action.payload }
        case DELETE_JOB_RESET:
                return {}
        default:
                return state;
    }
};