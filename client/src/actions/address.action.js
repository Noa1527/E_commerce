import axios from 'axios'

export const GET_ADDRESS = "GET_ADDRESS";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS";

// Get Addresss
export const GetAddress = (token) => {
    return (dispatch) => {
        return axios({
            method: "get",
            url: "http://localhost:8000/api/address",
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => {
                dispatch({
                    type: GET_ADDRESS,
                    payload: res.data
                })
            })
            .catch((err) => console.log(err))
    }
}
// update address
export const UpdateAddress = (
    token,
    myFirstname,
    myLastname,
    myPhone,
    myStreet,
    myRoute,
    myCity,
    mystate,
    myzip,
    mycountry
) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: 'http://localhost:8000/api/address',
            headers: { 'Authorization': `Bearer ${token}` },
            data: {
                city: myCity,
                street: myRoute,
                zipcode: myzip,
                number: myStreet,
                country: mycountry,
                firstname: myFirstname,
                lastname: myLastname,
                region: mystate,
                phone: myPhone,
            }
        })
            .then((res) => {
                alert("Votre adresse a été modifié avec succès !")
                dispatch({
                    type: UPDATE_ADDRESS,
                    payload: res.data
                })
            })
            .catch((err) => console.log(err))
    }
}
