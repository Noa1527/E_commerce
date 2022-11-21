import React from 'react';
import LI from "./ListFooter";
const FooterColAboutUs = (props) => {
    return (
        <>
            <div className={`${props.col} footer-col`} >
                <p>{props.p}</p>
                <ul className='list-unstyled col-question'>
                    <LI route={props.route1} >{props.un}</LI>
                    <LI route={props.route2} >{props.deux}</LI>
                    <LI route={props.route3} >{props.trois}</LI>
                </ul>
            </div>
        </>
    );
};

export default FooterColAboutUs;