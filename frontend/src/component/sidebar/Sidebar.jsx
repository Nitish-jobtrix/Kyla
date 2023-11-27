import React, { useEffect, useState } from 'react'
import './sidebar.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { images } from '../../constants'
import sidebarNav from '../../configs/sidebarNav'
import { userLogoutAction,userProfileAction } from '../../redux/actions/userAction'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios'

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [companyLogo, setCompanyLogo] = useState(0);
    const { user } = useSelector(state => state.userProfile);
    const location = useLocation();
    const navigate=useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(userProfileAction());
        dispatch(userProfileAction());
    }, []);

    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1]
        const activeItem = sidebarNav.findIndex(item => item.section === curPath)

        setActiveIndex(curPath.length === 0 ? 0 : activeItem)
    }, [location])

    useEffect(() => {
        const getUserdata = async () => {
            try {
              const res = await axios.get( 
                "/api/getuser",
                { responseType: "blob"} 
              );
              const blob = new Blob([res.data], { type: res.data.type });
              const link = document.createElement("a"); 
              link.href = window.URL.createObjectURL(blob);
              setCompanyLogo(link.href);
            } catch (error) {
              console.log(error);
            }
          };
          getUserdata() ;
      }, [])

    const closeSidebar = () => {
        document.querySelector('.main__content').style.transform = 'scale(1) translateX(0)'
        setTimeout(() => {
            document.body.classList.remove('sidebar-open')
            document.querySelector('.main__content').style = ''
        }, 500);
    }

    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {      
            navigate('/');
        }, 500)
    }

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <div className="company_logo">
                    <img src={companyLogo? companyLogo :images.usericon} alt="companylogo" />
                    <div>
                    <h3>{user?.firstName}</h3>
                    <h4 style={{color:"grey"}}>{user?.companyName}</h4>
                    <p>{user?.location}</p>
                    <button className='gradient' onClick={()=>navigate("/profile")}>View Profile</button>
                    </div> 
                </div>
                <div className="sidebar-close" onClick={closeSidebar}>
                    <i className='bx bx-x'></i>
                </div>
            </div>
            <div className="sidebar__menu">
                {
                    sidebarNav.map((nav, index) => (
                        <Link to={nav.link} key={`nav-${index}`} className={`sidebar__menu__item ${activeIndex === index && 'active'}`} onClick={closeSidebar}>
                            <div className="sidebar__menu__item__icon">
                                {nav.icon}
                            </div>
                            <div className="sidebar__menu__item__txt">
                                {nav.text}
                            </div>
                        </Link>
                    ))
                }
                <div className="sidebar__menu__item gradient">
                    <div className="sidebar__menu__item__icon">
                        <i className='bx bx-log-out'></i>
                    </div>
                    <div className="sidebar__menu__item__txt" onClick={logOut}>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
