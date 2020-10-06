import {
  GET_CATEGORY,
  GET_CATEGORY_PRODUCT,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORY_BY_ID,
} from "../actions/categories";

const initialState = {
  categories: [],
  categoryProducts: [],
  category: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: action.categories,
      };

    case GET_CATEGORY_PRODUCT:
      return {
        ...state,
        categoryProducts: action.categoriesProducts,
      };

    case GET_CATEGORY_BY_ID:
      return {
        ...state,
        category: action.category,
      };

    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category],
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.id),
      };

    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((cat) => {
          return cat.id === action.category.id ? action.category : cat;
        }),
      };
    default:
      return state;
  }
};
