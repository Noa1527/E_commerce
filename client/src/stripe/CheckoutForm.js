import React from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    let navigate = useNavigate();

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            
        });
        if (error) {
            console.log("something went wrong");
        } else {
            console.log(paymentMethod);
            const { id } = paymentMethod;
            console.log(id);
            const { data } = await axios.post(`http://127.0.0.1:8000/api/payment/${ id }`);
            console.log(data);
        }
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "100%",
                    height: "25%",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#353535",
                    border: "1px solid #fff",
                    

                }}
            >
                <CardElement
                    options={{
                        style: {
                            base: {
                                iconColor: "#c4f0ff",
                                color: "#fff",
                                fontWeight: 500,
                                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                                fontSize: "16px",
                                fontSmoothing: "antialiased",
                                ":-webkit-autofill": {
                                    color: "#fce883",
                                },
                                "::placeholder": {
                                    color: "#87BBFD",
                                },
                            },
                            invalid: {
                                iconColor: "#FFC7EE",
                                color: "#FFC7EE",
                            },
                        },
                        hidePostalCode: true,
                    }}
                />
                <button className="btn btn-success mt-4 w-50 me-auto ms-auto" >payer</button>
            </form>
            <button
                className="btn btn-secondary btn-return mt-4 w-25"
                onClick={() => { navigate("") }}
            >
                Retour
            </button>
        </>
    );
};

export default CheckoutForm;