import {React,useEffect,useState} from 'react';
import axios from 'axios';
import '../App.css';
import Header from './Header';
import Aside from './Aside';
import Footer from './Footer';
import 'typeface-open-sans';
import 'typeface-nunito';
import 'typeface-poppins';
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../vendor/bootstrap-icons/bootstrap-icons.css";
import "../vendor/boxicons/css/boxicons.min.css" ;
import "../vendor/quill/quill.snow.css" ;
import "../vendor/quill/quill.bubble.css" ;
import "../vendor/remixicon/remixicon.css" ;
import "../vendor/simple-datatables/style.css" ;
import $ from 'jquery';
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component"

function Inbox() {
    const [data, setData] = useState([]);

    const initialEmailFromRedux = useSelector((state) => state.user.email);
    const storedEmail = JSON.parse(sessionStorage.getItem('email'));
    const initialEmail = initialEmailFromRedux || storedEmail;
    // console.log(userEmail)

    const initialUsernameFromRedux = useSelector((state) => state.user.username);
    const storedUser = JSON.parse(sessionStorage.getItem('user'));   
    const initialUsername = initialUsernameFromRedux || storedUser.userName;
    // console.log(initialUsername)

    useEffect(() => {
      fetchData();
    }, []); 
  
    function fetchData() {
      axios.get('https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/web-query.php')
        .then(response => {
           console.log(response)
          setData([...response.data.data]);
         
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

      function handleDelete(value){

        $.ajax({
            type: 'POST',
            url: 'https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/query.php', 
            data:{UpdatedID:parseInt(value, 10),username:initialUsername,update:true},   
            success: function (response) {   
                alert("Mail Deleted Successfully")
                fetchData()
            },
            error: function (xhr, status, error) {
             
              console.error('Error:', status, error);
            }
        });
    
      }

      const a = [
        {
            name : 'From',
            selector : (row)=>row.From,
        },
        {
            name : 'To',
            selector : (row)=>row.To,
        },
        {
            name : 'Subject',
            selector : (row)=>row.Subject,
        },
        {
            name : 'Date',
            selector : (row)=>row.Date,
            cell: (row) => (
              <div>
                <span>{row.Date}</span>
                <i className='bi-trash ms-2 bb' onClick={()=>handleDelete(row.id)} value={row.id}></i>
              </div>
            ),
        }
      ]

      const dataa = [];
      data.map(list=>{
        // console.log({status:list.status})
        if (list.toEmailID === initialEmail && !list.status.includes(initialUsername)){
            dataa.push({From : list.fromEmailID, To : list.toEmailID, Subject : list.subject, Date : list.date, id:list.id})
            return null;
        }}) 

    return ( 
        <>
            <Header></Header>
            <Aside></Aside>
            <main id="main" className="main mb-5">
                <h1 className="pageTitle">Inbox</h1>
                <p className="col-12 text-center pt-3" id="inboxempty"></p>
                <DataTable
                    columns={a}
                    data={dataa}
                    pagination
                    fixedHeader
                    highlightOnHover
                />
            </main>
            <Footer></Footer>
        </>
     );
}

export default Inbox;