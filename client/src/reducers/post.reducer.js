import { DELETE_POST, GET_POSTS, LIKE_POST, UNLIKE_POST, GET_LIKES, UPDATE_POST, DELETE_COMMENT } from '../actions/post.actions';

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        // if the user likes a post, push the user id to the post's likes array
        if (post.id === action.payload.Post.id) {
          post.Likes.push(action.payload.Post.Like.UserId);
        }
        return post;
      })
    case UNLIKE_POST:
      return state.map((post) => {
        if (post.id === action.payload.Post.id) {
          // remove the user id from the array post.Likes
          post.Likes.splice(post.Likes.indexOf(action.payload.Post.Like.UserId), 1);
        }
        return post;
      })
    case GET_LIKES:
      return state.map((post) => {
        // iterate through action payload and get the likes for each post
        action.payload.forEach((like) => {
          return like;
        })
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
        // if the post has the comment id, remove the comment from the post and return the post updated
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
