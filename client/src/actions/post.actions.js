import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UUUNLIKE_POST';

export const getPosts = () => {
  return dispatch => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/post`)
      .then(res => {
        dispatch({
          type: GET_POSTS,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
};

export const likePost = (postId, userId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return dispatch => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}/like`,
      data: {
        id: userId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
        console.log(res);
      })
      .catch(err => console.log(err.response));
  };
};
