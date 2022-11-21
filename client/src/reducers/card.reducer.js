import { GET_CARD } from "../actions/card.action";

const initialState = {};

export default function cardReducer(state = initialState, action)
{
    switch(action.type){

        case GET_CARD:
            return action.payload;
        default:
            return state;
    }
}