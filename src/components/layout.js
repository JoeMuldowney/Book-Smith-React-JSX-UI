import React from 'react';
import Toolbar from './toolbar';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Toolbar />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;