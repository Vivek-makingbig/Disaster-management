import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';

import AdminPage from './pages/AdminDashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';



function App() {
   const [role, setRole] = useState(null);
  return (
    
      <BrowserRouter>
     {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Login setRole={setRole}/>}/>
      
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/admin' element={role==="admin"?<AdminPage/> : <Login setRole={setRole}/>}/>
      <Route path='/user' element={role==="user"?<Home/> : <Login setRole={setRole}/>}/>

       </Routes> 
   </BrowserRouter>

  )
}

export default App


