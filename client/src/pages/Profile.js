import React, { useContext } from 'react';
import UserAccount from '../components/UserAccount'
import { UidContext } from '../components/Hook/AppContext';
import Log from '../components/Log';

const Profile = () => {
    const uid = useContext(UidContext)
    return (
        <div className='content'>
            <div className='container-fluid style__container h-100 ps-0 pe-0' >
                {uid ? (
                    <UserAccount />
                ) : (
                    <div className='content__profile__log'>
                        <div className='row__profile__log'>
                            <Log register={true} login={false}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;