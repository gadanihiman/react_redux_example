import { FETCH_POSTS, LOGIN_USER } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  users: localStorage.getItem('Users') || [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}
