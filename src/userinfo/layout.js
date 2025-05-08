import React from 'react';
import Toolbar from './toolbar';
import Sidebar from './sidebar';


const Layout = ({ children }) => {
  

  return (
    <div className="layout">
      <Toolbar />
      <Sidebar />
      <div className="content">
        {children}
      </div>
      
    </div>
  );
};

export default Layout;