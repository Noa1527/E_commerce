import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

const AfterMadeAnAddress = (props) => {

    const addressData = useSelector((state) => state.addressReducer)

    const deleteAddress = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        // Delete address from database
        axios({
            method: "delete",
            url: 'http://localhost:8000/api/address',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => {
                console.log(res)
                if (res.status === 204) {
                    alert('votre adresse a été supprimée');
                    window.location.reload();
                }
            }
            )
            .catch((err) => console.log(err))
    }

    return (
        <div
            className='add__address address__container'
        >
            <div className='content-address'>
                <p className='mb-2'>{`${addressData.lastname} ${addressData.firstname}`}</p>
                <p>{`${addressData.number} ${addressData.street}`}</p>
                <p>{`${addressData.city}, ${addressData.zipcode}`}</p>
                <p>{addressData.region}</p>
                <p>{addressData.country}</p>
            </div>
            <div className='content-button'>
                <span className='text-light me-3' onClick={props.modal}>modifier</span>
                <span className='text-light' onClick={(e) => deleteAddress(e)}>supprimer</span>
            </div>
        </div>
    );
};

export default AfterMadeAnAddress;