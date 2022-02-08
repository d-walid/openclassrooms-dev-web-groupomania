import axios from 'axios';

export const ADD_POST = 'ADD_POST';
export const GET_POSTS = 'GET_POSTS';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


export const addPost = (data) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/post`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
  }
}

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


export const unlikePost = (postId, userId) => {
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
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
        console.log(res);
      })
      .catch(err => console.log(err.response));
  };
};


export const updatePost = (postId, message) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
      data: { message },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
}


export const deletePost = (postId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({ type: DELETE_POST, payload: { postId } });
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
}


export const addComment = (postId, commenterId, message, username) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}/comment`,
      data: {
        commenterId,
        message,
        username
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        console.log(res);
        dispatch({ type: ADD_COMMENT, payload: { postId, commenterId, message, username } });
      })
      .catch(err => console.log(err.response));
  }
}


export const deleteComment = (postId, commentId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}/comment`,
      data: {
        commentId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
}