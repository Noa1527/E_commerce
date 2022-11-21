import { GET_USER, UPDATE_EMAIL, UPDATE_PASSWORD } from "../actions/user.action";

const initialState = {}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPDATE_EMAIL:
            return {
                ...state,
                userData: action.payload
            };
        case UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload.password,
                confirm: action.payload.confirm
            };
        default:
            return state;
    }
}