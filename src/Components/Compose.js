import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from './Header';
import Aside from './Aside';
import Footer from './Footer';

import $ from 'jquery';
import { useSelector } from 'react-redux';

function Compose() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');

  // Get the user's email from Redux or sessionStorage
  const initialEmailFromRedux = useSelector((state) => state.user.email);
  const storedEmail = JSON.parse(sessionStorage.getItem('email'));
  const initialEmail = initialEmailFromRedux || storedEmail;


  useEffect(() => {
    sessionStorage.setItem('email', JSON.stringify(initialEmail));
  }, [initialEmail]);

  const data = {
    from: initialEmail,
    to: to,
    subject: subject,
    status: '',
  };

  function emailValidation(email){
    return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  function composemail(event) {
    console.log(data);
    event.preventDefault();
    if(to === ''){
        alert('Enter To Email')
    }
    else if(!emailValidation(to)){
        alert('Enter Vaild To Email')
    }
    else{
        $.ajax({
            type: 'POST',
            url: 'https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/query.php',
            data: { compose: true, composeData: JSON.stringify(data) },
            success: function (response) {
              alert('Mail Sent Successfully');
              setSubject('');
              setTo('');
            },
            error: function (xhr, status, error) {
              console.error('Error:', status, error);
            },
          });
    }
  }

  return (
    <>
      <Header></Header>
      <Aside></Aside>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Compose</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Mail</li>
              <li className="breadcrumb-item active">Compose</li>
            </ol>
          </nav>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Compose a mail</h5>
            <h6 id="yourmail">From : {initialEmail} </h6>
            <form
              className="row g-3"
              id="composeemail"
              onSubmit={(event) => composemail(event)}
            >
              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control eamilTo"
                    id="floatingName"
                    value={to}
                    onChange={(event) => setTo(event.target.value)}
                    placeholder="Your Name"
                  />
                  <label>To : </label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control emailSubject"
                    placeholder="Address"
                    id="floatingTextarea"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    style={{ height: '150px' }}
                  ></textarea>
                  <label>Subject : </label>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Compose;
