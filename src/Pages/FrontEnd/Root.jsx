import React from 'react';
import Navbar from '../../Components/FrontEnd/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
     return (
          <>

          <Navbar></Navbar>
          <Outlet></Outlet>          
               
          </>
     );
};

export default Root;