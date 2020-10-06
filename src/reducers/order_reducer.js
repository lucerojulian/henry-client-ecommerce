import { EDIT_ORDER, FETCH_ORDERS, GET_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
  order: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_ORDER:
      return {
        ...state,
      };
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.order,
      };
    default:
      return state;
  }
};
