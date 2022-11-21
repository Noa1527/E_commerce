import { GET_AN_ARTICLES } from "../actions/oneArticle.action";


const initialState = {};

export default function articlesReducer(state = initialState, action)
{
    switch(action.type){

        case GET_AN_ARTICLES:
            return action.payload;
        default:
            return state;
    }
}