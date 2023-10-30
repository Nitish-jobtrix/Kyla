import {
    COMPANY_USER_APPLY_JOB_FAIL,
    COMPANY_USER_APPLY_JOB_REQUEST,
    COMPANY_USER_APPLY_JOB_SUCCESS,
    COMPANY_USER_APPLY_JOB_RESET,

    COMPANY_USER_LOAD_FAIL,
    COMPANY_USER_LOAD_REQUEST,
    COMPANY_USER_LOAD_SUCCESS,
    COMPANY_USER_LOAD_RESET,

    COMPANY_USER_LOGOUT_FAIL,
    COMPANY_USER_LOGOUT_REQUEST,
    COMPANY_USER_LOGOUT_SUCCESS,
    COMPANY_USER_LOGOUT_RESET,

    COMPANY_USER_SIGNIN_FAIL,
    COMPANY_USER_SIGNIN_REQUEST,
    COMPANY_USER_SIGNIN_SUCCESS,
    COMPANY_USER_SIGNIN_RESET,
    

    COMPANY_USER_SIGNUP_FAIL,
    COMPANY_USER_SIGNUP_REQUEST,
    COMPANY_USER_SIGNUP_SUCCESS,
    COMPANY_USER_SIGNUP_RESET,
} from '../constants/companyUserConstant';


// sign In reducer
export const companyUserReducerSignIn = (state = {}, action) => {
    switch (action.type) {
        case COMPANY_USER_SIGNIN_REQUEST:
            return { loading: true, companyUserInfo: null, companyUserisAuthenticated: false }
        case COMPANY_USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                companyUserInfo: action.payload,
                companyUserisAuthenticated: true
            }
        case COMPANY_USER_SIGNIN_FAIL:
            return { loading: false, companyUserInfo: null, isAuthenticated: false, error: action.payload } //
        case COMPANY_USER_SIGNIN_RESET:
            return {}
        default:
            return state;
    }
}

// sign up reducer
export const companyUserReducerSignUp = (state = {}, action) => {
    switch (action.type) {
        case COMPANY_USER_SIGNUP_REQUEST:
            return { loading: true }
        case COMPANY_USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                companyUserSignUp: action.payload,
            }
        case COMPANY_USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        case COMPANY_USER_SIGNUP_RESET:
            return {}
        default:
            return state;
    } 
}

//company user profile
export const companyUserReducerProfile = (state = { companyUser: null }, action) => {
    switch (action.type) {
        case COMPANY_USER_LOAD_REQUEST:
            return { loading: true, companyUser: null }
        case COMPANY_USER_LOAD_SUCCESS:
            return {
                loading: false,
                companyUser: action.payload.user,
            }
        case COMPANY_USER_LOAD_FAIL:
            return { loading: false, companyUser: null, error: action.payload }
        case COMPANY_USER_LOAD_RESET:
            return {}
        default:
            return state;
    }

}

//log out reducer
export const companyUserReducerLogout = (state = {}, action) => {
    switch (action.type) {
        case COMPANY_USER_LOGOUT_REQUEST:
            return { loading: true }
        case COMPANY_USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                companyUser: action.payload,
            }
        case COMPANY_USER_LOGOUT_FAIL:
            return { loading: false, error: action.payload }
        case COMPANY_USER_LOGOUT_RESET:
            return {}
        default:
            return state;
    }

}

// apply for a job reducer
export const companyUserApplyJobReducer = (state = {}, action) => {
    switch (action.type) {
        case COMPANY_USER_APPLY_JOB_REQUEST:
            return { loading: true }
        case COMPANY_USER_APPLY_JOB_SUCCESS:
            return {
                loading: false,
                companyUser: action.payload,
            }
        case COMPANY_USER_APPLY_JOB_FAIL:
            return { loading: false, error: action.payload }
        case COMPANY_USER_APPLY_JOB_RESET:
            return {}
        default:
            return state;
    }

}


