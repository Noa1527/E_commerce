import { combineReducers } from "redux";
import userReducer from'./user.reducer';
import articlesReducer from "./articles.reducer";
import addressReducer from "./address.reducer";
import cardReducer from "./card.reducer";
import oneArticleReducer from "./oneArticle.reducer";
export default combineReducers({
    userReducer,
    articlesReducer,
    addressReducer,
    cardReducer,
    oneArticleReducer
})