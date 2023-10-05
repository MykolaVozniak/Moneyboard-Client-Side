import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';


class Layout extends Component {
    render() {
        return (
            <>
                <header>

                </header>

                <Outlet/>

                <footer>2023</footer>

            </>
        );
    }
}

export default Layout;