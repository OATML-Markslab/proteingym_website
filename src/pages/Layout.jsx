import React from "react";
import { Outlet } from "react-router-dom";
import Navigationbar from "../misc/NavigationBar";

const Layout = () => {
    return (
        <>
        <Navigationbar />
        <Outlet />
        </>
    );
};

export default Layout; 