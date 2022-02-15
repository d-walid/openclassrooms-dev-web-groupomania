import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO, DELETE_USER } from '../actions/user.actions';

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      // Récupère les information de l'utilisateur.
      return {
        ...state,
        ...action.payload,
      };
    case UPLOAD_PICTURE:
      // Met à jour l'image de profil de l'utilisateur.
      return { ...state, avatar: action.payload };
    case UPDATE_BIO:
      // Met à jour la biographie de l'utilisateur.
      return { ...state, biography: action.payload };
    case DELETE_USER:
      // Supprime l'utilisateur.
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
