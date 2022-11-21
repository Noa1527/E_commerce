import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

const AfterMadeAnAddress = (props) => {

    // const cardData = useSelector((state) => state.cardReducer)

    const deleteCard = (e) => {

        e.preventDefault();

        console.log('coucou');

        const token = localStorage.getItem("token");

        // Delete address from database
    //     axios({
    //         method: "delete",
    //         url: 'http://localhost:8000/api/payment',
    //         headers: { 'Authorization': `Bearer ${token}` }
    //     })
    //         .then((res) => {
    //             console.log(res)
    //             if (res.status === 204) {
    //                 alert('votre adresse a été supprimée');
    //                 window.location.reload();
    //             }
    //         }
    //         )
    //         .catch((err) => console.log(err))
    }


    return (
        <div
            className='add__address address__container'

        >
            <div className='content-address'>
                {/* <p className='mb-2'>{`${cardData.lastname} ${cardData.firstname}`}</p>
                <p>{`${cardData.number} ${cardData.street}`}</p>
                <p>{`${cardData.city}, ${cardData.zipcode}`}</p>
                <p>{cardData.region}</p>
                <p>{cardData.country}</p> */}
            </div>
            <div className='content-button'>
                <span className='text-light me-3' onClick={props.modal}>modifier</span>
                <span className='text-light' onClick={(e) => deleteCard(e)}>supprimer</span>
            </div>
        </div>
    );
};

export default AfterMadeAnAddress;