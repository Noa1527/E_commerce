import React from 'react';
import { NavLink } from "react-router-dom";
const ListFooter = (props) => {
    return (
        <>
            <li><NavLink to={props.route}>{props.children}</NavLink></li>
        </>
    );
};

export default ListFooter;