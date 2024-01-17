import {React,useEffect,useState} from 'react';
import axios from 'axios';
import '../App.css';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from "react-redux";
import Aside from './Aside';
import DataTable from "react-data-table-component"


function Trash() {
    const [data, setData] = useState([]);

    const initialUsernameFromRedux = useSelector((state) => state.user.username);
    const storedUser = JSON.parse(sessionStorage.getItem('user'));   
    const initialUsername = initialUsernameFromRedux || storedUser.userName;

    useEffect(() => {
        
        axios.get('https://vervenest.com/demo/trainingtasks/Hariharan/ReactEmailCURDBackend/web-query.php')
          .then(response => {
           
            setData([...response.data.data]);
          })
          .catch(error => {
           
            console.error('Error fetching data:', error);
          });
      }, []);

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
        }
      ]

      const dataa = [];
      data.map(list=>{
        if (list.status.includes(initialUsername)){
            dataa.push({From : list.fromEmailID,To : list.toEmailID,Subject : list.subject ,Date : list.date})
        }})

    return ( 
        <>
            <Header></Header>
            <Aside></Aside>
            <main id="main" className="main mb-5">
                <h1 className="pageTitle">Trash</h1>
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

export default Trash;