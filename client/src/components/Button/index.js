import React from 'react';
import './button.scss'
const Button = (props) => {
    return (
        <button
            style={{
                width: `${props.width}xp`,
                height: `${props.height}xp`,
                border: `${props.size}px ${props.underLine} #${props.colorBorder}`
            }}
            className='flat-button'
        >
            {props.children}
        </button>
    );
};

export default Button;