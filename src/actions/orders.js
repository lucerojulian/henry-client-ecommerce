import axios from "axios";

export const EDIT_ORDER = "EDIT_ORDER";
export const GET_ORDER = "GET_ORDER";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const editOrder = (data, id) => {
  return (dispatch) => {
    axios.put(`http://localhost:3000/orders/${id}`, data).then((order) => {
      dispatch({
        type: EDIT_ORDER,
      });
    });
  };
};

export const fetchOrders = (state) => {
  var statequery = "";
  if (state) {
    statequery = `?state=${state}`;
  }
  return (dispatch) => {
    axios.get(`http://localhost:3000/orders${statequery}`).then((orders) => {
      dispatch({
        type: FETCH_ORDERS,
        orders: orders.data,
      });
    });
  };
};

export const getOrder = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/orders/${id}`).then((order) => {
      dispatch({
        type: GET_ORDER,
        order: order.data,
      });
    });
  };
};
