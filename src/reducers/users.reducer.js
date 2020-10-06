const GETALL_REQUEST = "USERS_GETALL_REQUEST";
const GETALL_SUCCESS = "USERS_GETALL_SUCCESS";
const GETALL_FAILURE = "USERS_GETALL_FAILURE";

const DELETE_REQUEST = "USERS_DELETE_REQUEST";
const DELETE_SUCCESS = "USERS_DELETE_SUCCESS";
const DELETE_FAILURE = "USERS_DELETE_FAILURE";

export function users(state = {}, action) {
  switch (action.type) {
    case GETALL_REQUEST:
      return {
        loading: true,
      };
    case GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case GETALL_FAILURE:
      return {
        error: action.error,
      };
    case DELETE_REQUEST:
      return {
        ...state,
        items: state.items.data.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case DELETE_SUCCESS:
      return {
        items: state.items.data.filter((user) => user.id !== action.id),
      };
    case DELETE_FAILURE:
      return {
        ...state,
        items: state.items.data.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }
          return user;
        }),
      };
    default:
      return state;
  }
}
