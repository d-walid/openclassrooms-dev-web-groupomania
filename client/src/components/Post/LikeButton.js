import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { likePost } from '../../actions/post.actions';

// Context
import { UidContext } from '../Context/AppContext';

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post.id, uid));
    setLiked(true);
  };
  const unlike = () => {
    console.log('test unlike');
  };

  useEffect(() => {
    const likedPost = post.Likes.filter(like => like.UserId === uid);
    if (likedPost.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [uid, liked, post.Likes]);

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={['bottom center', 'bottom right', 'bottom left']}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer ce post.</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <p>{post.Likes.length}</p>
    </div>
  );
};

export default LikeButton;
