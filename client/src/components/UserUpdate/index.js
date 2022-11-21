import React, { useState } from 'react';
import './userupdate.scss';
import Mail from './Mail';
import Password from './Password';
import Deleted from './Deleted.js';
import Modal from "../Modal";
import { useSelector } from 'react-redux';

const UserUpdate = () => {
    const [openModalMail, setOpenModalMail] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);
    const [openModalDeleded, setOpenModalDeleded] = useState(false);

    const userData = useSelector((state) => state.userReducer)


    return (
        <div className='content__userupdate'>
            <h1>Vos information</h1>

            <div className='email__update update' onClick={() => setOpenModalMail(true)}>
                <p><strong>Email:</strong><span>{userData.email}</span></p>
            </div>
            <Modal height={35} trigger={openModalMail} setTrigger={setOpenModalMail}>
                <Mail />
            </Modal>

            <div className='password__update update' onClick={() => setOpenModalPassword(true)}>
                <p><strong>Mot de passe</strong></p>
            </div>
            <Modal height={55} trigger={openModalPassword} setTrigger={setOpenModalPassword}>
                <Password />
            </Modal>

            <div className='delete__user mt-5 d-flex align-items-center ' onClick={() => setOpenModalDeleded(true)}>
                    <p className='mb-0'><strong className='me-4 fs-5'>Suprimer un compte</strong> Supprimer votre compte de manière définitive </p>
            </div>
            

            <Modal height={60} trigger={openModalDeleded} setTrigger={setOpenModalDeleded}>
                <Deleted />
            </Modal>
        </div >
    );
};

export default UserUpdate;