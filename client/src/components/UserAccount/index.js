import React from 'react';
import './account.scss';
import Banner from "./BannerUser";
import AcountText from "./AccountText";
import { useSelector } from 'react-redux';

const UserAccount = () => {
    const userData = useSelector((state) => state.userReducer)

    return (
        <div className='user__account'>
            <Banner
                email={userData.email}
            />
            <AcountText />
        </div>
    );
};

export default UserAccount;