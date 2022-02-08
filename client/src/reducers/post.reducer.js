import { DELETE_POST, GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST, DELETE_COMMENT } from '../actions/post.actions';

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map(post => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            Likes: [action.payload.userId, ...post.Likes]
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map(post => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            Likes: post.Likes.filter((id) => id !== action.payload.userId)
          }
        }
        return post;
      })
    case UPDATE_POST:
      return state.map(post => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter(post => post.id !== action.payload.postId);
    case DELETE_COMMENT:
      return state.map(post => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            Comments: post.Comments.filter((comment) => comment.id !== action.payload.commentId)
          }
        } else return post;
      })
    default:
      return state;
  }
}
