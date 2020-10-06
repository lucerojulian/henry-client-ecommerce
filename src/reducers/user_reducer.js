// import { GET_USERS, ADD_USER, DELETE_USER, EDIT_USER } from "../actions/users";

// const initialState = {
//   allUsers: [],
//   userDetail: {},
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case GET_USERS:
//       return {
//         ...state,
//         allUsers: action.users,
//       };

//     case ADD_USER:
//       return {
//         ...state,
//         allUsers: [...state.allUsers, action.user],
//       };

//     case DELETE_USER:
//       return {
//         ...state,
//         allUsers: state.allUsers.filter((user) => user.id !== action.id),
//       };

//     case EDIT_USER:
//       return {
//         ...state,
//         allUsers: state.allUsers.map((user) => {
//           return user.id === action.user.id ? action.user : user;
//         }),
//       };
//     default:
//       return state;
//   }
// };
