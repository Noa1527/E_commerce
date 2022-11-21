import { GET_ARTICLES, GET_BRAND } from "../actions/articles.action";


const initialState = {};

export default function articlesReducer(state = initialState, action)
{
    switch(action.type){

        case GET_ARTICLES:
            return action.payload;

        case GET_BRAND:
            return {
                ...state,
                brandData: action.payload
            }
        default:
            return state;
    }
}