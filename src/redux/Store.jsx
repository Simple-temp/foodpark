import { createStore, combineReducers } from "redux";
import reducer from "./Reducer";

const rootReducer = combineReducers({
  cartState: reducer,
});

const store = createStore(rootReducer);

export default store;
