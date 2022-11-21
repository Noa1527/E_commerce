import axios from 'axios'

export const GET_USER = "GET_USER";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const POST_ADDRESS = "POST_ADDRESS";

export const GetUser = (token) => {
    return (dispatch) => {
        return axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/user",
            headers: { 'Authorization': `Bearer ${token}` }

        })

            .then((res) => {
                dispatch({
                    type: GET_USER,
                    payload: res.data
                })
            })
            .catch((err) => console.log(err))
    }
}
// Update email in User

export const UpdateEmail = (token, userData) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: "http://127.0.0.1:8000/api/user",
            headers: { 'Authorization': `Bearer ${token}` },
            data: { email: userData },
        })
            .then((res) => {
                dispatch({
                    type: UPDATE_EMAIL,
                    payload: userData
                })
            })
            .catch((err) => console.log(err))

    }
}

// Update Password in User
export const UpdatePassword = (token, password, confirm) => {
    return (dispatch) => {
        return axios({
            method: "PATCH",
            url: "http://127.0.0.1:8000/api/user/update-password",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            data: {
                password: password,
                confirm: confirm
            },
        })
            .then((res) => {
                console.log(res);
                dispatch({
                    type: UPDATE_PASSWORD,
                    payload: { password, confirm }
                })
            }
            ).catch((err) => console.log(err))
    }
}