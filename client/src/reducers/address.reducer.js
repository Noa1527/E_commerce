import { GET_ADDRESS, UPDATE_ADDRESS } from "../actions/address.action";

const initialState = {}

export default function addressReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ADDRESS:
            return action.payload;
        case UPDATE_ADDRESS:
            return {
                ...state,
                address: action.payload
            };
        default:
            return state;
    }
}