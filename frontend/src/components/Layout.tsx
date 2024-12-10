import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./NavBar";


 const Layout=({children})=>{
    return(
        <div>
            <Header/>
            <Navigation/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
};
export default Layout;