import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const data = {
        name : name,
        email : email,
        username : username,
        password : password
    }
   
    function handleRegister(event){
        event.preventDefault();
        if(name === '' || email === '' || username === '' || password === ''){
            alert("Enter all fields to register")
        }
        else if(isChecked === false){
            alert("Agree terms and conditions")
        }
        else{
            $.ajax({
                type: 'POST',
                url: 'https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/query.php', 
                data:{registerUsername:username,registerEmail:email,registerCheck:true},   
                success: function (response) {   
                    console.log(response)
                    if(response.message === "found"){
                        alert('Username Already Taken')
                    }
                    else if(response.message === "emailfound"){
                        alert('Email Already in Use')
                    }
                    else if(response.message === "notfound"){
                        $.ajax({
                            type: 'POST',
                            url: 'https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/query.php', 
                            data:{user:JSON.stringify(data),createUser:true},   
                            success: function (response) {   
                                alert("Registered Successfully")
                                navigate("/");
                            },
                            error: function (xhr, status, error) {
                             
                              console.error('Error:', status, error);
                            }
                        });
                    }
                },
                error: function (xhr, status, error) {
                 
                  console.error('Error:', status, error);
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
                            <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                            <p className="text-center small">Enter your personal details to create account</p>
                        </div>

                        <form className="row g-3 needs-validation" id="registerform" onSubmit={(event)=>handleRegister(event)}                    >
                            <div className="col-12">
                                <label  className="form-label">Your Name</label>
                                <input type="text" name="name" className="form-control" onChange={(event)=>setName(event.target.value)} id="yourName"/>
                                <div className="invalid-feedback">Please, enter your name!</div>
                            </div>

                            <div className="col-12">
                                <label  className="form-label">Your Email</label>
                                <input type="email" name="email" className="form-control" onChange={(event)=>setEmail(event.target.value)} id="yourEmail"/>
                                <div className="invalid-feedback">Please enter a valid Email adddress!</div>
                            </div>

                            <div className="col-12">
                                <label  className="form-label">Username</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                    <input type="text" name="username" className="form-control" onChange={(event)=>setUsername(event.target.value)} id="yourUsername" />
                                    <div className="invalid-feedback">Please choose a username.</div>
                                </div>
                            </div>

                            <div className="col-12">
                                <label  className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" onChange={(event)=>setPassword(event.target.value)} id="yourPassword"/>
                                <div className="invalid-feedback">Please enter your password!</div>
                            </div>

                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" name="terms" type="checkbox" value="" onChange={()=>setIsChecked(!isChecked)} id="acceptTerms" />
                                    <label className="form-check-label" >I agree and accept the <a href="rt">terms and conditions</a></label>
                                    <div className="invalid-feedback">You must agree before submitting.</div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary w-100" type="submit" id="createAccountBtn">Create Account</button>
                                </div>
                                <div className="col-12">
                                <p className="small mb-0">Already have an account? <Link to="/">Login</Link></p>
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

export default Register;