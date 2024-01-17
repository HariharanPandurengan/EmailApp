import {React,useState} from 'react';
import '../App.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { updateUserDetails } from "../redux/Store";
import { logout } from '../redux/Store';
import { useDispatch } from "react-redux";


function Login() {
    // http://localhost/jobmate-webservices/index.php/api_consultancy/getAllConsultantcyAndConsultancyCandidate/
    
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const location = useLocation(); 
    
        if(location.pathname === '/'){
            dispatch(logout())
        }

        const[username,setUsername] = useState('');
        const[password,setPassword] = useState('');

        const data = {
            name : username,
            password : password
        }

        function handleLogin(event){
            event.preventDefault();
            if(username === ''){
                alert("Enter Username")
            }
            else if(password === ''){
                alert("Enter Password")
            }
            else{
                $.ajax({
                    url: 'https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/query.php', 
                    type: 'POST',
                    data: {loginData: JSON.stringify(data),loginCheck:true}, 
                    success: function(data) {
                       
                        if(data.message === "usernameNotfound"){
                            alert("username notfound")
                        }     
                        else if(data.message === "passwordWorng"){
                            alert("wrong password")
                        }
                        else if(data.message === "loginSuccess"){
                            const details = {
                                username : data.username,
                                email : data.email,
                            }
                            dispatch(updateUserDetails(details))
                            navigate('/compose')
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error(error,xhr,status);
                    }
                });
            }
         
        }
    return ( 
        <>
            <main>
                <div className="container">

                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div className="d-flex justify-content-center py-2">
                                <a href="https://www.vervenest.com/" className="logo d-flex align-items-center w-auto loginRegisterLogo">
                                    <img src="https://vervenest.com/assets/site/images/logo-dark.png" alt=""/>
                                </a>
                            </div>

                            <div className="card mb-3">

                                <div className="card-body">

                                <div className="pt-4 pb-2">
                                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                    <p className="text-center small">Enter your username & password to login</p>
                                </div>

                                <form className="row g-3 needs-validation" id="loginForm" onSubmit={(event)=>handleLogin(event)} >

                                    <div className="col-12">
                                    <label  className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                        <input type="text" name="username" className="form-control loginUsername" onChange={(event)=>setUsername(event.target.value)} id="yourUsername"/>
                                        <div className="invalid-feedback">Please enter your username.</div>
                                    </div>
                                    </div>

                                    <div className="col-12">
                                    <label  className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control loginPassword" onChange={(event)=>setPassword(event.target.value)} id="yourPassword"/>
                                    <div className="invalid-feedback">Please enter your password!</div>
                                    </div>

                                    <div className="col-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe"/>
                                        <label className="form-check-label" >Remember me</label>
                                    </div>
                                    </div>
                                    <div className="col-12">
                                    <button className="btn btn-primary w-100" type="submit">Login</button>
                                    </div>
                                    <div className="col-12">
                                    <p className="small mb-0">Don't have account? <Link to="/register">create an account</Link></p>
                                    </div>
                                </form>

                                </div>
                            </div>

                            <div className="credits">
                                Designed by <a href="https://www.vervenest.com/">Vervanest</a>
                            </div>

                            </div>
                        </div>
                        </div>

                    </section>

                </div>
            </main>
        </>
     );
}

export default Login;