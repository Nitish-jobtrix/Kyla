import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { loadJobReducer, loadJobSingleReducer, registerAjobReducer, deleteAjobReducer } from './reducers/jobReducer';
import { createJobTypeReducer, loadJobTypeReducer } from './reducers/jobTypeReducer';
import {
    allUserReducer,
    userApplyJobReducer,
    userReducerLogout,
    userReducerProfile,
    userReducerSignIn,
    userReducerSignUp
} from './reducers/userReducer';
import {
   
    companyUserApplyJobReducer,
    companyUserReducerLogout,
    companyUserReducerProfile,
    companyUserReducerSignIn,
    companyUserReducerSignUp
} from './reducers/companyUserReducer';
import { modeReducer } from './reducers/themeModeReducer';

//combine reducers
const reducer = combineReducers({
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile,
    singleJob: loadJobSingleReducer,
    userJobApplication: userApplyJobReducer,
    allUsers: allUserReducer,
    signUp: userReducerSignUp,
    mode: modeReducer,
    registerJob: registerAjobReducer,
    deleteJob: deleteAjobReducer,
    createJobType: createJobTypeReducer,


    companyUserSignUp: companyUserReducerSignUp,
    companyUserSignIn: companyUserReducerSignIn,
    companyUserLogOut: companyUserReducerLogout,
    companyUserProfile: companyUserReducerProfile,
    companyUserJobApplication: companyUserApplyJobReducer,

});


//initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    companyUserSignIn:{
        companyUserInfo: localStorage.getItem('companyUserInfo') ? JSON.parse(localStorage.getItem('companyUserInfo')) : null
    },
    mode: {
        mode: "light"
    }
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;