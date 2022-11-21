import React from 'react';
import LI from "./ListIcons";

const FooterColIcons = (props) => {
    return (
        <>
            <div className={`${props.col} footer-col`} id=''>
                <p>{props.p}</p>
                <ul className='list-unstyled flex-wrap-icons'>
                    <LI
                        href={props.img1}
                        src={props.src1}
                        height={props.h}
                        width={props.w}
                    />
                    <LI

                        href={props.img2}
                        src={props.src2}
                        height={props.h}
                        width={props.w}
                    />
                    <LI
                        href={props.img3}
                        src={props.src3}
                        height={props.h}
                        width={props.w}
                    />
                    <LI
                        href={props.img4}
                        src={props.src4}
                        height={props.h}
                        width={props.w}
                    />
                </ul>
            </div>
        </>
    );
};

export default FooterColIcons;