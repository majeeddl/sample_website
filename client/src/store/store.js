import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authorizationReducer } from "./reducers/auth.reducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const rootReducer = combineReducers({
  authorization: authorizationReducer,
});

const store = createStore(rootReducer, composedEnhancer);

export default store;
