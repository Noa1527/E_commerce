import React from 'react';
import "./popup.scss";
const Popup = (props) => {
    const handleClick = (e) => {
        e.stopPropagation();
    }
    return (props.trigger) ? (
        <>
            <div 
                onClick={
                    () => props.setTrigger(false)
                } 
                className='popup'
            >
                <div 
                    onClick={handleClick} 
                    style={
                        {
                            height:`${props.height}%`,
                            width:`${props.width}%`,
                            background:`#${props.color}`
                        }
                    } 
                    className='popup__inner'
                >
                    <svg className='svg2' viewbox="0 0 32 32" >
                        <g fill={`#${props.color}`}>
                            <path
                                d="M12.538 6.478c-.14-.146-.335-.228-.538-.228s-.396.082-.538.228l-9.252 
                                9.53c-.21.217-.27.538-.152.815.117.277.39.458.69.458h18.5c.302 0 
                                .573-.18.69-.457.118-.277.058-.598-.152-.814l-9.248-9.532z"
                            ></path>
                        </g>
                    </svg>
                    {props.children}
                </div>
            </div>
        </>
    ) : "";
};

export default Popup;