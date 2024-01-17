import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from './Header';
import Footer from './Footer';
import 'typeface-open-sans';
import 'typeface-nunito';
import 'typeface-poppins';
import '../vendor/bootstrap/css/bootstrap.min.css';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import Aside from './Aside';


function Profile() {

    const navigate = useNavigate()

    const[updatedFullname,setUpdatedFullname] = useState();
    const[updatedCountry,setUpdatedCountry] = useState(null);
    const[updatedAddress,setUpdatedAddress] = useState();
    const[updatedPhone,setUpdatedPhone] = useState();
    const[updatedimg,setUpdatedimg] = useState();
    const[profileImage,setProfileImage] = useState(null)


    const[editPro,setEditPro] = useState(false) 

    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const initialUsernamee =  storedUser.userName;

    const storedEmail = JSON.parse(sessionStorage.getItem('email'));

    useEffect(()=>{
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        const initialUsername =  storedUser.userName;
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
                    fullname : d.fullname,
                    country : d.country,
                    address : d.address,
                    phone : d.phone,
                    image : d.image
                }

                console.log(d)

                setUpdatedFullname(details.fullname)
                setUpdatedCountry(details.country)
                setUpdatedAddress(details.address)
                setUpdatedPhone(details.phone)
                setUpdatedimg(details.image)
            },
            error: function(xhr, status, error) {
                console.error(error,xhr,status);
            }
        });
    }, []);

   
    function handleUpdate(event) {
        event.preventDefault();
      
        const formData = new FormData();
        formData.append('UpdateProfile', true);
        formData.append('fullname', updatedFullname);
        formData.append('country', updatedCountry);
        formData.append('address', updatedAddress);
        formData.append('phone', updatedPhone);
        formData.append('username', initialUsernamee);
        
        // Check if a new image file is selected
        if (profileImage) {
          formData.append('image', profileImage);
        }

        $.ajax({
            type: 'POST',
            url: 'https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/updateProfile.php',
            data:formData,
            processData:false,
            contentType:false,
            cache:false,
            success: function (response) {
                alert('Details Updated')
                navigate('/compose')
                // navigate("/profile")
            },
            error: function (xhr, status, error) {

                console.error('Error:', status, error);
            }
        });
        
      }
      

    function deleteImage(){

        const storedUser = JSON.parse(sessionStorage.getItem('user'));
    
        const initialUsername =  storedUser.userName;

        const formData = new FormData();
        formData.append('username', initialUsername);
        formData.append('DeleteImg', true);

        $.ajax({
            url: 'https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/updateProfile.php', 
            type: 'POST',
            data: formData, 
            processData:false,
            contentType:false,
            cache:false,
            success: function(data) {
                console.log(data)
            },
            error: function(xhr, status, error) {
                console.error(error,xhr,status);
            }
        });
        // window.location.reload()
    }

    return ( 
        <>
            <Header></Header>
            <Aside></Aside>
                <main id="main" className="main">

                    <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item">Users</li>
                        <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                    </div>

                    <section className="section profile">
                    <div className="row">
                        <div className="col-xl-4">

                        <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                <img src={updatedimg === ''?'https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg':`data:image/jpeg;base64,${updatedimg}`} alt="Profile"/>
                                <h2>{initialUsernamee}</h2>
                                <h3>{storedEmail}</h3>

                            </div>
                        </div>

                        </div>

                        <div className="col-xl-8">

                        <div className="card">
                            <div className="card-body pt-3">

                            <ul className="nav nav-tabs nav-tabs-bordered">

                                <li className="nav-itemt">
                                     <button style={!editPro ? { borderBottom: "2px solid blue" } : {}} onClick={()=>{
                                        setEditPro(false) 
                                        }} className={!editPro ? ' me-2 bg-white ff' : 'nav-linkg bg-white me-2'}>Profile Overview</button>
                                </li>

                                <li className="nav-itemt">
                                     <button style={editPro ? { borderBottom: "2px solid blue" } : {}} onClick={()=>{
                                        setEditPro(true)
                                        }} className={editPro ? ' me-2 bg-white ff' : 'nav-linkg bg-white me-2'}>Edit Profile</button>
                                </li>

                            </ul>
                            <div className="tab-content pt-2">
                                <div className={`tab-pane fade show active ${editPro === true && 'd-none'}`}>
                                    
                                    <h5 className="card-title">Profile Details</h5>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                        <div className="col-lg-9 col-md-8">{updatedFullname === 'null'? '-' : updatedFullname}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label">Country</div>
                                        <div className="col-lg-9 col-md-8">{(updatedCountry === 'null' || updatedCountry === null) ? '-' : updatedCountry}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label">Address</div>
                                        <div className="col-lg-9 col-md-8">{(updatedAddress === 'null' || updatedAddress === null) ? '-' : updatedAddress}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label">Phone</div>
                                        <div className="col-lg-9 col-md-8">{(updatedPhone === 'null' || updatedPhone === null) ? '-' : updatedPhone}</div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 label">Email</div>
                                        <div className="col-lg-9 col-md-8">{storedEmail}</div>
                                    </div>

                                </div>

                                <div className={editPro ? "tab-pane fade show active profile-edit pt-3" : "tab-pane fade profile-edit pt-3"}>
                                    <form onSubmit={(event)=>handleUpdate(event)} encType="multipart/form-data">
                                        <div className="row mb-3">
                                        <label  className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                                        <div className="col-md-8 col-lg-9">
                                        <img src={updatedimg === '' ? 'https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg':`data:image/jpeg;base64,${updatedimg}`} alt="Profile"/>
                                            <div className="pt-2">
                                                <input className="btn-primary btn-sm" name="profileImage" type="file" accept="image/*" onChange={(event)=>{
                                                    const selectedFile = event.target.files[0];
                                                    setProfileImage(selectedFile);
                                                }} title="Upload new profile image"></input>
                                                {
                                                    (updatedimg !== 'null') &&  <button onClick={deleteImage} className="btn btn-danger btn-sm" title="Remove my profile image">
                                                                                            Delete Image<i className="bi bi-trash ps-2"></i>
                                                                                         </button>
                                                }
                                            </div>
                                        </div>
                                        </div>

                                        <div className="row mb-3">
                                        <label  className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                                        <div className="col-md-8 col-lg-9">
                                            <input name="fullName" type="text" className="form-control" id="fullName" onChange={(event)=>setUpdatedFullname(event.target.value)} value={updatedFullname === 'null' ? '' : updatedFullname}/>
                                        </div>
                                        </div>

                                        <div className="row mb-3">
                                        <label  className="col-md-4 col-lg-3 col-form-label">Country</label>
                                        <div className="col-md-8 col-lg-9">
                                            <input name="country" type="text" className="form-control" id="Country" value={updatedCountry === 'null' ? '' : updatedCountry} onChange={(event)=>setUpdatedCountry(event.target.value)}  placeholder=" --Not Given--"/>
                                        </div>
                                        </div>

                                        <div className="row mb-3">
                                        <label  className="col-md-4 col-lg-3 col-form-label">Address</label>
                                        <div className="col-md-8 col-lg-9">
                                            <input name="address" type="text" className="form-control" id="Address" onChange={(event)=>setUpdatedAddress(event.target.value)} value={updatedAddress === 'null' ? '' : updatedAddress} placeholder=" --Not Given--"/>
                                        </div>
                                        </div>

                                        <div className="row mb-3">
                                        <label  className="col-md-4 col-lg-3 col-form-label">Phone</label>
                                        <div className="col-md-8 col-lg-9">
                                            <input name="phone" type="text" className="form-control" id="Phone" onChange={(event)=>setUpdatedPhone(event.target.value)} value={updatedPhone === 'null' ? '' : updatedPhone} placeholder=" --Not Given--"/>
                                        </div>
                                        </div>

                                        <div className="row mb-3">
                                        <label  className="col-md-4 col-lg-3 col-form-label">Email</label>
                                        <div className="col-md-8 col-lg-9">
                                            <input name="email" type="email" className="form-control" id="Email" value={storedEmail} disabled/>
                                        </div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            
                            </div>

                            </div>
                        </div>

                        </div>
                    </div>
                    </section>

                </main>
            <Footer></Footer>
        </>
     );
}

export default Profile;