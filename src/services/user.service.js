import axios from "axios";

function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

export const userService = {
  loginWithGoogle,
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function loginWithGoogle() {
  return axios.get(`http://localhost:3000/auth/google`).then((user) => {
    localStorage.setItem("user", JSON.stringify(user.data));
    return user.data;
  });
}

function login(email, password) {
  const requestOptions = {
    email,
    password,
  };

  return axios
    .post(`http://localhost:3000/auth/login`, requestOptions, {
      withCredentials: true,
    })
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user.data));
      return user.data;
    });
}

function logout() {
  // remove user from local storage to log user out
  return axios.get(`http://localhost:3000/auth/logout`).then((res) => {
    localStorage.removeItem("user");
  });
}

function getAll() {
  const requestOptions = {
    // method: "GET",
    headers: authHeader(),
  };

  return axios.get(`http://localhost:3000/users`, requestOptions);
  // .then
  // // handleResponse
  // ();
}

function getById(id) {
  const requestOptions = {
    // method: "GET",
    headers: authHeader(),
  };

  return axios.get(`http://localhost:3000/users/${id}`, requestOptions);
}

function register(user) {
  return axios.post(`http://localhost:3000/users/`, user);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    // headers: { ...authHeader(), "Content-Type": "application/json" },
    user,
  };

  return axios.put(
    `http://localhost:3000/users/${user.data.id}`,
    requestOptions
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    // method: "DELETE",
    headers: authHeader(),
  };

  return axios.delete(`http://localhost:3000/users/${id}`, requestOptions);
}

// function handleResponse(response) {
//   return response.then((text) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//         // location.reload(true);
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }
