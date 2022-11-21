export const GET_AN_ARTICLES = "GET_AN_ARTICLES";

//Get all articles
export const GetAnArticle = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_AN_ARTICLES,
            payload: data
        })
    }
}

