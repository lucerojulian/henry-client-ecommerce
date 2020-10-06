import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  SEARCH_PRODUCT,
  GET_PRODUCTS_CATEGORY,
} from "../actions/products";

const initialState = {
  products: [],
  product: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    //Reemplazo products con lo que devolvio la action
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };

    case GET_PRODUCTS_CATEGORY:
      return {
        ...state,
        products: action.productsCategory,
      };

    // Al arreglo de productos le devuelvo un nuevo arreglo con nuevoproducto

    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
      };

    // Al arrgelo de productos, busco el que tiene el id y lo reemplazo por el nuevo editado
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => {
          return product.id === action.product.id ? action.product : product;
        }),
      };

    //Al arreglo de prouctos le saco el producto eliminado
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
      };

    case SEARCH_PRODUCT:
      return {
        ...state,
        products: action.founds,
      };

    default:
      return state;
  }
};
