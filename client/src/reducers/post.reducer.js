import { DELETE_POST, GET_POSTS, LIKE_POST, UNLIKE_POST, GET_LIKES, UPDATE_POST, DELETE_COMMENT } from '../actions/post.actions';

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      // Récpère toutes les publications.
      return action.payload;
    case LIKE_POST:
      // Si l'utilisateur aime une publication, on ajoute l'id de l'utilisateur à la liste des likes de la publication.
      return state.map((post) => {
        if (post.id === action.payload.Post.id) {
          post.Likes.push(action.payload.Post.Like.UserId);
        }
        return post;
      })
    case UNLIKE_POST:
      // Enlève l'id de l'utilisateur de la liste des likes de la publication.
      return state.map((post) => {
        if (post.id === action.payload.Post.id) {
          post.Likes.splice(post.Likes.indexOf(action.payload.Post.Like.UserId), 1);
        }
        return post;
      })
    case GET_LIKES:
      // Récupère la liste des likes de la publication.
      return state.map((post) => {
        action.payload.forEach((like) => {
          return like;
        })
        return post;
      })
    case UPDATE_POST:
      // Met à jour la publication avec les nouvelles données et retourne la nouvelle publication.
      return state.map(post => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      // Supprime la publication et retourne les publications sans celle supprimée.
      return state.filter(post => post.id !== action.payload.postId);
    case DELETE_COMMENT:
      // Supprime le commentaire et retourne les publications sans le commentaire supprimé.
      return state.map(post => {
        if (post.id === action.payload.postId) {
          post.Comments = post.Comments.filter(comment => comment.id !== action.payload.commentId);
          return post;
        }
        return post;
      });
    default:
      return state;
  }
}
