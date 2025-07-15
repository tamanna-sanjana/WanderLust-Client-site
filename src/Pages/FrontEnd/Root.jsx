import React from 'react';
import Navbar from '../../Components/FrontEnd/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/FrontEnd/Footer';

const Root = () => {
     return (
          <>

          <Navbar></Navbar>
          <Outlet></Outlet>  
          <Footer></Footer>        
               
          </>
     );
};

export default Root;