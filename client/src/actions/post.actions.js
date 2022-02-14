import axios from 'axios';

export const ADD_POST = 'ADD_POST';
export const GET_POSTS = 'GET_POSTS';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';
export const GET_LIKES = 'GET_LIKES';
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

export const likePost = (id, userId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return dispatch => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/post/${id}/like`,
      data: {
        userId: userId,
        postId: id
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({
          type: LIKE_POST,
          payload: res.data
        });

      })
      .catch(err => console.log(err));
  };

};

export const unlikePost = (postId, userId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return dispatch => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}/like`,
      data: {
        userId: userId,
        postId: postId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({
          type: UNLIKE_POST,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
};


export const getLikes = (postId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return dispatch => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/post/${postId}/likes`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res => {
        dispatch({
          type: GET_LIKES,
          payload: res.data.likes
        });
      })
      .catch(err => console.log(err));
  };
}

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


export const addComment = (postId, UserId, message, username) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/post/${postId}/comment`,
      data: {
        UserId,
        message,
        username
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        console.log(res.data.Comment);
        dispatch({ type: ADD_COMMENT, payload: res.data.Comment });
      })
      .catch(err => console.log(err.response));
  }
}


export const deleteComment = (id, UserId, PostId, username) => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/api/post/comment/${id}`,
      data: {
        UserId,
        PostId,
        username
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({ type: DELETE_COMMENT, payload: { id } });
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
}
