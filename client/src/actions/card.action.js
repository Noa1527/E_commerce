export const GET_CARD = "GET_CARD";

//Get one card
export const GetCard = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_CARD,
            payload: data
        })
    }
}

