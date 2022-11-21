import React from 'react';
import BTN from "../Button";
import { NavLink } from "react-router-dom";
import UserUpdate from '../../components/UserUpdate';
import Button from 'react-bootstrap/Button';

const AccountText = () => {

    function disconnect() {
        localStorage.removeItem('token');
        window.location = '/';

    }
    return (
        <>

            <div className='container-fluid  text__container'>
                <div className='text__column'>
                    <div>
                        <h2 className='fs-5'>Gérez vos adresses et méthodes de paiement pour :</h2>
                        <h3 className='fs-6'>Modifier votre adresse</h3>
                        <h3 className='fs-6'>Modifier vos informations de paiement</h3>
                    </div>
                    <div className='btn__payment'>
                        <BTN
                            width={60}
                            height={40}
                            href={''}
                            size={'1'}
                            underLine={'solid'}
                            colorBorder={'B794F6'}
                        >
                            <NavLink to="/payment">GÉRER</NavLink>
                        </BTN>
                    </div>
                </div>

                <div>
                    <div className='content'>
                        <div className='container style__container h-100 ps-0 pe-0 pt-5 pb-5' >
                            <UserUpdate />
                        </div>
                        <div className='d-flex justify-content-center flex-column align-items-center py-2 px-2 mb-4'>
                            <h3 className='text-light'>Se Déconnecter</h3>
                            <Button className='ps-4 pe-4 w-25 ' onClick={disconnect} variant="outline-danger">Deconnexion</Button>
                        </div>
                    </div>

                </div>

            </div>
            <div className='banner__bottom pt-3'></div>
        </>
    );
};

export default AccountText;