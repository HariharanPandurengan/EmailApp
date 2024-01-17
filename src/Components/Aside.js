import React from 'react';
import '../App.css';
import { useLocation,Link } from "react-router-dom";
import { aside } from '../redux/Store';
import { logout } from '../redux/Store';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Aside() {
    const location = useLocation(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let asidee = useSelector((state)=>state.user.aside)
    return ( 
        <>
            
            <aside id="sidebar" className={asidee === true ? 'sidebar' : 'sidebarpp'}>

                <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-item">
                    <Link onClick={()=>{
                        dispatch(aside())
                        }} className={`nav-link ${location.pathname === '/compose' ? '' : 'collapsed'}`} id="compose" to="/compose"  >
                        <i className="bi bi-pencil-square"></i><span>Compose</span>
                    </Link> 
                </li>

                <li className="nav-item">
                    <Link onClick={()=>{
                        dispatch(aside())
                        }} className={`nav-link ${location.pathname === '/inbox' ? '' : 'collapsed'}`} id="inbox"  to="/inbox">
                        <i className="bi bi-inbox"></i><span>Inbox</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link onClick={()=>{
                        dispatch(aside())
                        }} className={`nav-link ${location.pathname === '/sent' ? '' : 'collapsed'}`}  to="/sent">
                    <i className="bi bi-envelope-fill"></i><span>Sent</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link onClick={()=>{
                        dispatch(aside())
                        }} className={`nav-link ${location.pathname === '/trash' ? '' : 'collapsed'}`}  to="/trash">
                    <i className="bi bi-trash"></i><span>Trash</span>
                    </Link>  
                </li>

                </ul>

            </aside>

        </>
     );
}

export default Aside;
