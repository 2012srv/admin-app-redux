import React from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/images/logo.png';

const Logo = (props) => {
    return (
        <Link className='Logo' to="/"><img src={logo} alt="logo" /></Link>
    )
}

export default Logo;