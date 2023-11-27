import React, { useEffect } from 'react'
import { Sidebar, Menu, MenuItem, menuClasses, useProSidebar } from 'react-pro-sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box, useTheme } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import Person3Icon from '@mui/icons-material/Person3';
import ArticleIcon from '@mui/icons-material/Article';
import Avatar from '@mui/material/Avatar';
import logoDashboard from '../../images/hr-project.png'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { companyUserProfileAction ,companyUserLogoutAction} from '../../redux/actions/companyUserAction';

const SidebarAdm = () => {
    // const { userInfo } = useSelector(state => state.signIn);
    const { companyUserInfo } = useSelector(state => state.companyUserSignIn);
   const {companyName}=useParams();
    const { palette } = useTheme();
    const { collapsed } = useProSidebar();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(companyUserProfileAction());
    }, []);

    //log out 
    const logOut = () => {
        dispatch(companyUserLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/jobs/candidate/login');
        }, 500)
    }


    return (
        <>
            <Sidebar backgroundColor="white" style={{ borderRightStyle: "none" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
                    <Box>
                        <Box sx={{ pt: 3, pb: 5, display: "flex", justifyContent: "center" }}>

                            {
                                collapsed ?
                                    <Avatar alt="logo dashboard" src={logoDashboard} /> :
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <img style={{ width: "100px", heigth: "100px", textAlign: "center", transition: "all ease-out .5s" }} src={logoDashboard} alt="logo dashboard" />
                                    </Box>
                            }

                        </Box>

                        <Menu

                            menuItemStyles={{


                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#3b3838",
                                    },
                                    [`&.${menuClasses.disabled}`]: {
                                        color: "green",
                                    },
                                    '&:hover': {
                                        backgroundColor: "#e6d4f5",
                                        color: "#8624db",
                                    },
                                },

                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: "#3b3838",
                                    },
                                    '&:hover': {
                                        color: "#8624db",
                                    }
                                },
                            }}

                        >
                             { companyUserInfo   &&    <>
                                        <MenuItem component={<Link to={`/jobs/candidate/dashboard`} />} icon={<DashboardIcon />}> Dashboard </MenuItem>
                                        <MenuItem component={<Link to={`/jobs/candidate/applied`} />} icon={<WorkHistoryIcon />}> Applied Jobs </MenuItem>
                                        <MenuItem component={<Link to={`/jobs/candidate/info`} />} icon={<Person3Icon />}> Personal Info </MenuItem>
                                        <MenuItem component={<Link to={`/jobs/candidate/upload`} />} icon={<ArticleIcon />}> Upload Resume </MenuItem>
                                    </>
                             }

                        </Menu>
                    </Box>
                    <Box sx={{ pb: 2 }}>
                        <Menu
                            menuItemStyles={{


                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#3b3838",
                                    },

                                    '&:hover': {
                                        backgroundColor: "#e6d4f5",
                                        color: "#8624db",
                                    },
                                },

                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: "#3b3838",
                                    },
                                    '&:hover': {
                                        color: "#8624db",
                                    }
                                },
                            }}
                        >
                            <MenuItem onClick={logOut} icon={<LoginIcon />}>   Log out </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Sidebar>
        </>
    )
}

export default SidebarAdm