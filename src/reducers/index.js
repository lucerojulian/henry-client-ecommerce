import { combineReducers } from "redux";
import products from "./product_reducer";
import categories from "./category_reducers";
import cart from "./cart_reducer";
import order from "./order_reducer";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  products,
  categories,
  cart,
  authentication,
  registration,
  users,
  alert,
  order,
});

export default rootReducer;
