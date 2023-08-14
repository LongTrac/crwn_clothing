//This root reducer will combine all reducers in our application under 1 roof
import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/categories.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
})