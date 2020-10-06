const SUCCESS = "ALERT_SUCCESS";
const ERROR = "ALERT_ERROR";
const CLEAR = "ALERT_CLEAR";

export const alertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: SUCCESS, message };
}

function error(message) {
  return { type: ERROR, message };
}

function clear() {
  return { type: CLEAR };
}
