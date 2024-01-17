import React from 'react';
import {Routes, Route, useNavigate,Router } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Compose from './Components/Compose';
import Inbox from './Components/Inbox';
import Sent from './Components/Sent';
import Trash from './Components/Trash';
import { Provider } from 'react-redux';
import { store } from "./redux/Store";
import { useEffect } from 'react';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
          
          <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>  
            <Route element={<ProtectedRoute></ProtectedRoute>}>
                <Route path="/inbox" element={<Inbox></Inbox>}></Route>
                <Route path="/sent" element={<Sent></Sent>}></Route>
                <Route path="/compose" element={<Compose></Compose>}></Route>
                <Route path="/trash" element={<Trash></Trash>}></Route>
                <Route path='/profile' element={<Profile></Profile>}></Route>
            </Route>
          </Routes>
      </Provider>        
    </div>
  );
}

export default App;
