// import { loginWithGoogle } from "../firebase";
// // import { useDispatch, useSelector } from "react-redux";
// // const dispatch = useDispatch();

// //Constantes

// const initialData = {
//   loggedIn: false,
//   fetching: false,
// };
// const LOGINGOOGLE = "LOGINGOOGLE";
// const LOGINGOOGLE_SUCCESS = "LOGINGOOGLE_SUCCESS";
// const LOGINGOOGLE_ERROR = "LOGINGOOGLE_ERROR";

// // Reducers
// export default function reducer(state = initialData, action) {
//   switch (action.type) {
//     case LOGINGOOGLE:
//       return { ...state, fetching: true };
//     case LOGINGOOGLE_ERROR:
//       return { ...state, fetching: false, error: action.payload };
//     case LOGINGOOGLE_SUCCESS:
//       return { ...state, fetching: false, ...action.payload, loggedIn: true };
//     default:
//       return state;
//   }
// }

// // Actions

// export const loginWithGoogleAction = () => (dispatch, getState) => {
//   dispatch({
//     type: LOGINGOOGLE,
//   });
//   return loginWithGoogle()
//     .then((user) => {
//       dispatch({
//         type: LOGINGOOGLE_SUCCESS,
//         payload: {
//           uid: user.uid,
//           displayName: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL,
//         },
//       });
//       saveStorage(getState);
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: LOGINGOOGLE_ERROR,
//         payload: err.message,
//       });
//     });
// };

// // auxiliar

// function saveStorage(storage) {
//   localStorage.storage = JSON.stringify(storage);
// }
