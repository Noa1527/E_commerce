import React from 'react';
import StripeContainer from '../../stripe/StripeContainer';
import { LogoPayments } from "../../Helpers/LogoFooterData";

const FormPayment = () => {
    return (
        <>
            <div className='main'>
                <div className='content__payment__card'>
                    <div className="header__section pb-3">
                        <div className='box-title '>
                            <h2 className='text-light fs-4'><strong>Méthodes de paiement</strong></h2>
                            <span>
                                <em className='text-danger pe-1'>*</em>
                                <span className='text-light'>Ce champ est obligatoire</span>
                            </span>
                        </div>
                        <div className="icons-payment">
                            {LogoPayments.map((item, index) => {
                                return (
                                    <div key={index} className='icon-payment'>
                                        <img className={`img${index}`} src={item.img} alt='logo' />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <StripeContainer />
                </div>
            </div>
        </>
    );
};

export default FormPayment;