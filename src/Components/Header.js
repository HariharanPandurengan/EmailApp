import React, { useState,useEffect } from 'react';
import '../App.css';
import {Link, useLocation } from "react-router-dom";
import { logout } from '../redux/Store';
import { aside } from '../redux/Store';
import { useSelector,useDispatch } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';



function Header() {
    const dispatch = useDispatch();
    const[updatedimg,setUpdatedimg] = useState();
    const[profile,setProfile] = useState(false)
    const navigate = useNavigate();

    const location = useLocation(); 
    
        if(location.pathname === '/'){
            dispatch(logout())
        }

        useEffect(()=>{

            const formData = new FormData();
            formData.append('username', initialUsername);
            formData.append('getting', true);
    
            $.ajax({
                url: 'https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/updateProfile.php', 
                type: 'POST',
                data: formData, 
                processData:false,
                contentType:false,
                cache:false,
                success: function(data) {
                    const d = JSON.parse(data)
                    const details = {
                        image : d.image
                    }
                    setUpdatedimg(details.image)
                },
                error: function(xhr, status, error) {
                    console.error(error,xhr,status);
                }
            });
            
         // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // empty dependency array for running once on mount
    
    const initialUsernameFromRedux = useSelector((state) => state.user.username);

    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    
    const initialUsername = initialUsernameFromRedux || storedUser.userName;


  
    useEffect(() => {
      sessionStorage.setItem('user', JSON.stringify({ initialUsername}));
    }, [initialUsername]);

    const storedEmail = JSON.parse(sessionStorage.getItem('email'));

    return ( 
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <a href="https://www.vervenest.com/" className="logo d-flex align-items-center headera">
                    <img src="https://vervenest.com/assets/site/images/logo-dark.png" alt="" />
                    {/* <span className="d-none d-lg-block">NiceAdmin</span>  */}
                </a>
                <i onClick={()=>{
                    dispatch(aside())
                }} className="bi bi-list toggle-sidebar-btn"></i>
            </div>

            <div className="search-bar">
                <form className="search-form d-flex align-items-center" method="POST" action="#">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                    <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                </form>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item d-block d-lg-none">
                    <a className="nav-link nav-icon search-bar-toggle " href="degfb">
                        <i className="bi bi-search"></i>
                    </a>
                    </li>

                    <li className="nav-item dropdown pe-3">

                    <div  onClick={()=>{
                        profile === false ? setProfile(true) : setProfile(false)
                    }} className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                        <img src={updatedimg === ''?'https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg':`data:image/jpeg;base64,${updatedimg}`} alt="Profile" className="rounded-circle"/>
                        <span className="d-none d-md-block dropdown-toggle ps-2" id="userName">{initialUsername}</span>
                    </div>

                    <ul className={`dropdown-menuu dropdown-menu-end dropdown-menu-arrow ${!profile === true && 'd-none'}`}>
                            <li className="dropdown-header">
                                <h5 style={{fontWeight:'600'}}>{initialUsername}</h5>
                                <span>{storedEmail}</span>
                            </li>
                            <li>
                                 <hr />
                            </li>

                            <li>
                                <Link style={{cursor:"pointer"}} to="/profile" className="dropdown-item d-flex align-items-center ps-4">
                                    <i className="bi bi-person"></i>
                                    <span>My Profile</span>
                                </Link>
                            </li>
                    
                            <li>
                                <hr />
                            </li>

                            <li style={{cursor:"pointer"}} onClick={()=>{
                                    navigate("/")
                                    dispatch(logout())
                                    }}>
                                <div style={{cursor:"pointer"}} className="dropdown-item d-flex align-items-center ps-4">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                </div>
                            </li>

                        </ul>

                    </li>

                </ul>
            </nav>

            </header>

     );
}

export default Header;