import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_QUANTITY,
  EMPTY_CART,
  GET_CART,
  FETCH_FROM_DB,
  REMOVE_MESSAGE,
} from "../actions/cart";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        products: action.products,
      };

    case FETCH_FROM_DB:
      //Dandole formato a lo que devuelve axios:
      var toAdd = [];
      if (action.products && action.products.length > 0) {
        action.products.forEach((product) => {
          let item = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.productsorder.price,
            image: product.image,
            stock: product.stock,
            quantity: product.productsorder.quantity,
          };
          toAdd.push(item);
        });
      }
      return {
        ...state,
        products: toAdd,
        orderId: action.orderId,
      };

    case ADD_TO_CART:
      //Valido si el producto ya esta en el carrito
      let find = state.products.find(({ id }) => id === action.product.id);
      if (find) {
        return {
          ...state,
          message: "El producto ya se encuentra en el carrito",
        };
      } else {
        return {
          ...state,
          products: [
            ...state.products,
            {
              ...action.product,
              quantity: 1,
            },
          ],
          total: state.total + parseInt(action.product.price),
          message: undefined,
        };
      }

    case REMOVE_FROM_CART:
      let product = state.products.find(({ id }) => id === action.productId);
      return {
        ...state,
        products: state.products.filter((prod) => prod.id !== action.productId),
        total: state.total - parseInt(product.price),
      };

    case SET_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.productId
            ? { ...product, quantity: action.qty }
            : product
        ),
      };

    case EMPTY_CART:
      return {
        ...state,
        products: [],
        total: 0,
      };

    case REMOVE_MESSAGE:
      return {
        ...state,
        message: undefined,
      };

    default:
      return state;
  }
};
