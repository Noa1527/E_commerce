import React from 'react';


const BannerUser = (props) => {

    return (
        <div className='banner'>
            <div className='block__user'>
                <div className='img__email'>
                    <span className='email'>
                        {props.email}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BannerUser;