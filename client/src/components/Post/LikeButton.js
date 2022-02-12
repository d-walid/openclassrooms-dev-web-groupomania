import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { likePost, unlikePost } from '../../actions/post.actions';

const LikeButton = ({ post }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer);
  const [liked, setLiked] = useState(true);

  const like = () => {
    dispatch(likePost(post.id, userData.id));
  }

  const unlike = () => {
    dispatch(unlikePost(post.id, userData.id));
  }

  console.log(post.Likes);
  useEffect(() => {
    if (post.Likes.length === 1) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [liked, userData.id, post.Likes]);

  return (
    <div className="like-container">
      {userData.id === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={['bottom center', 'bottom right', 'bottom left']}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer ce post.</div>
        </Popup>
      )}
      {userData.id && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {userData.id && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{post.Likes.length}</span>
    </div>
  );
};
export default LikeButton;

