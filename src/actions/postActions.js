import { FETCH_POSTS, LOGIN_USER } from './types';

export const fetchPosts = () => dispatch => {
  dispatch({
    type: FETCH_POSTS,
    payload: []
  })
};

export const postLogin = loginData => dispatch => {
  let allUsers = JSON.parse(localStorage.getItem("Users"));

  let newData = [loginData];
  if (!allUsers){
    console.log(`no data, created new one!`);
    localStorage.setItem("Users", JSON.stringify(newData));
  } else {
    var index = allUsers.findIndex(user => user.email === loginData.email)
    localStorage.setItem("Users", JSON.stringify(allUsers));
    if (index === -1){
        allUsers.push(loginData)
        localStorage.setItem("Users", JSON.stringify(allUsers));
        console.log(`new user added!`)
    } else {
      console.log(`registered!`)
    }
  }
  dispatch({
    type: LOGIN_USER,
    payload: loginData
  })
};