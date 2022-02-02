import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_BIO = 'UPDATE_BIO';

export const getUser = uid => {
  return dispatch => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`)
      .then(res => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch(err => console.log(err.message));
  };
};

export const uploadPicture = (data, id) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return dispatch => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/upload/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
          .then(res => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.avatar });
          })
          .catch(err => {
            console.log(err.response.data);
          });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const updateBio = (id, biography) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  console.log('token update page ' + token);

  return dispatch => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/api/user/upload/${id}`,
      data: { biography },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({ type: UPDATE_BIO, payload: biography });
      })
      .catch(err => console.log(err.response));
  };
};
