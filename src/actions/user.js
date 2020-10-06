import { alertActions } from "./alert";
import { userService } from "../services/user.service";

const REGISTER_REQUEST = "USERS_REGISTER_REQUEST";
const REGISTER_SUCCESS = "USERS_REGISTER_SUCCESS";
const REGISTER_FAILURE = "USERS_REGISTER_FAILURE";

const LOGIN_REQUEST = "USERS_LOGIN_REQUEST";
const LOGIN_SUCCESS = "USERS_LOGIN_SUCCESS";
const LOGIN_FAILURE = "USERS_LOGIN_FAILURE";

const LOGOUT = "USERS_LOGOUT";

const GETALL_REQUEST = "USERS_GETALL_REQUEST";
const GETALL_SUCCESS = "USERS_GETALL_SUCCESS";
const GETALL_FAILURE = "USERS_GETALL_FAILURE";

const DELETE_REQUEST = "USERS_DELETE_REQUEST";
const DELETE_SUCCESS = "USERS_DELETE_SUCCESS";
const DELETE_FAILURE = "USERS_DELETE_FAILURE";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
};

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));
    userService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        // return user;
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.register(user).then(
      (user) => {
        dispatch(success());
        // history.push("/home");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: REGISTER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: GETALL_REQUEST };
  }
  function success(users) {
    return { type: GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: DELETE_FAILURE, id, error };
  }
}
