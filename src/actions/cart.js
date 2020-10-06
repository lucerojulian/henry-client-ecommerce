import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_QUANTITY = "SET_QUANTITY";
export const EMPTY_CART = "EMPTY_CART";
export const GET_CART = "GET_CART";
export const FETCH_FROM_DB = "FETCH_FROM_DB";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

//Action para mandar al reducer lo que este en DB (Si esta logueado) o lo que este en LocalStorage
export const getCart = (localCart) => {
  return {
    type: GET_CART,
    products: localCart,
  };
};

//Esto se puede hacer con dos promesas y hacer promise all
export const fetchCartFromDb = (idUser) => {
  return (dispatch) => {
    axios.get(`http://localhost:3000/users/${idUser}/cart`).then((res) => {
      dispatch({
        type: FETCH_FROM_DB,
        products: res.data.products,
        orderId: res.data.id,
      });
    });
  };
};

//Si mandan idUser hago post al server sino no no
export const addToCart = (product, idUser) => {
  if (idUser) {
    let data = {
      idProduct: product.id,
      quantity: 1,
      price: product.price,
    };
    axios.post(`http://localhost:3000/users/${idUser}/cart`, data);
  }
  return {
    type: ADD_TO_CART,
    product,
  };
};

//Si mandan idUser hago delete al server sino no (para localstorage)???
export const removeFromCart = (productId, idUser) => {
  if (idUser) {
    axios.delete(`http://localhost:3000/users/${idUser}/cart/${productId}`);
  }
  return {
    type: REMOVE_FROM_CART,
    productId,
  };
};

//Si mandan idUser hago put al server sino no (para localstorage)
export const setQuantity = (productId, qty, idUser) => {
  if (idUser) {
    let data = {
      quantity: qty,
      idProducto: productId,
    };
    axios.put(`http://localhost:3000/users/${idUser}/cart`, data);
  }
  return {
    type: SET_QUANTITY,
    productId,
    qty,
  };
};

//Si mandan idUser hago delete al server sino no (para localstorage)
export const emptyCart = (idUser) => {
  if (idUser) {
    axios.delete(`http://localhost:3000/users/${idUser}/cart`);
  }
  return {
    type: EMPTY_CART,
  };
};

export const cleanMessage = () => {
  return {
    type: REMOVE_MESSAGE,
  };
};
