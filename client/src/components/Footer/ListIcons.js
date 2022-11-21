import React from 'react';

const ListIcons = (props) => {
    return (
        <li><a href={props.href}><img style={{ height:`${props.height}px`, width: `${props.width}px`,}} className='img__size' src={props.src} alt='une icone' /></a></li>
    );
};

export default ListIcons;