import React from 'react';

const InThePopup = (props) => {
    return (
        <div className='text__popup'><p className='p__popup'>{props.children}</p></div>
    );
};

export default InThePopup;