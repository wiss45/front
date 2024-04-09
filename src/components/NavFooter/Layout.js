// Layout.js

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';


const Layout = ({ children }) => {
  return (
    <div className="container">
      <Navbar className="navbar" />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          {children}
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default Layout;
