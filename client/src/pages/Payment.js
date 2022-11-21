import React, { useState } from 'react';
import FormAddress from '../components/MethodsAdrsPay/FormAddress';
import FormPayment from '../components/MethodsAdrsPay/FormPayment';
import Modal from '../components/Modal'
import AfterMadeAnAddress from '../components/MethodsAdrsPay/AfterMadeAnAddress';
import AfterSaveCard from '../components/MethodsAdrsPay/AfterSaveCard';
import FormUpdateCard from '../components/MethodsAdrsPay/FormUpdateCard';
import FormUpdateAddress from '../components/MethodsAdrsPay/FormUpdateAddress';
import { useSelector } from 'react-redux';

const Payment = () => {
    const [showModalAddress, setShowModalAddress] = useState(false);
    const [showModalCard, setShowModalCard] = useState(false);
    const [showModalUpdateAddress, setShowModalUpdateAddress] = useState(false);
    const [showModalUpdateCard, setShowModalUpdateCard] = useState(false);
    const addressData = useSelector((state) => state.addressReducer)
    const cardData = useSelector((state) => state.cardReducer)

    return (
        <>
            <div className='content__payment'>
                <div className='content__methode'>
                    <h2><strong>Carnet d’adresses</strong></h2>
                    <h3> Adresses de livraison et de facturation</h3>

                    <div className='cards-address'>
                        {
                            addressData === null
                                ? < div
                                    className='add__address address__container'
                                    onClick={() => setShowModalAddress(true)}
                                >
                                    <span className='plus-icon'></span>
                                    <span className='text-light'>Ajouter une adresse</span>
                                </div>


                                :
                                <AfterMadeAnAddress
                                    modal={() => setShowModalUpdateAddress(true)}
                                />
                        }
                    </div>
                </div>
                <Modal
                    trigger={showModalAddress}
                    setTrigger={setShowModalAddress}
                    height='80'
                    width='50'
                >
                    <FormAddress />
                </Modal>
                <Modal
                    trigger={showModalUpdateAddress}
                    setTrigger={setShowModalUpdateAddress}
                    height='80'
                    width='50'
                >
                    <FormUpdateAddress />
                </Modal>
                <div className='content__methode'>
                    <h2><strong>Méthodes de paiement</strong></h2>
                    <h3> Cartes de crédit/ débit </h3>
                    <div
                        className='add__payment payment__container'
                    // onClick={() => setShowModalCard(true)}
                    >
                        {/* <span className='plus-icon'></span> */}
                        <span className='text-light text-center'>Aucun moyen de paiement n'à été ajoutée</span>
                    </div>
                    {/* {
                        cardData === null ?
                            <div
                                className='add__payment payment__container'
                                onClick={() => setShowModalCard(true)}
                            >
                                <span className='plus-icon'></span>
                                <span className='text-light'>Ajouter une adresse</span>
                            </div>
                            :

                            <AfterSaveCard
                                modal={() => setShowModalUpdateCard(true)}
                            />
                    } */}

                </div>
                {/* <Modal
                    trigger={showModalCard}
                    setTrigger={setShowModalCard}
                    height='60'
                    width='50'
                >
                    <FormPayment />
                </Modal> */}
                <Modal
                    trigger={showModalUpdateCard}
                    setTrigger={setShowModalUpdateCard}
                    height='80'
                    width='50'
                >
                    <FormUpdateCard

                    />
                </Modal>
            </div>
        </>
    );
};

export default Payment;