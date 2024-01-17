import React from 'react';
import '../App.css';

function Footer() {
    return ( 
        <>
                  {/* <a  className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a> */}
  <footer id="footer" className="footer">
    <div className="copyright">
      &copy; Copyright <strong><span>Vervanest</span></strong>. All Rights Reserved
    </div>
    <div className="credits">
      Designed by <a href="https://www.vervenest.com/">Vervanest</a>
    </div>
  </footer>
        </>
  );
}

export default Footer;