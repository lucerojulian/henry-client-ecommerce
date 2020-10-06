const REGISTER_REQUEST = "USERS_REGISTER_REQUEST";
const REGISTER_SUCCESS = "USERS_REGISTER_SUCCESS";
const REGISTER_FAILURE = "USERS_REGISTER_FAILURE";

export function registration(state = {}, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { registering: true };
    case REGISTER_SUCCESS:
      return {};
    case REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
}
