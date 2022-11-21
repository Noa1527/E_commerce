
export const GET_ARTICLES = "GET_ARTICLES";
export const GET_BRAND = "GET_BRAND";

//Get all articles
export const GetArticles = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_ARTICLES,
            payload: data
        })
    }
}

//Get articles by brand
export const GetBrand = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_BRAND,
            payload: data
        })
    }
}