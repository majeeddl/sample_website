import { createStore, combineReducers } from "redux";
import { authorizationReducer } from "./reducers/auth.reducer";

const rootReducer = combineReducers({
  authorization: authorizationReducer,
});

const store = createStore(rootReducer);

export default store;
