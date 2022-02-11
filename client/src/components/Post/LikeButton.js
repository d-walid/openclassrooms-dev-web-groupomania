import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { likePost, unlikePost } from '../../actions/post.actions';

// Context
import { UidContext } from '../Context/AppContext';




const LikeButton = ({ post }) => {
  console.log(post.Likes);
  const uid = useContext(UidContext);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post.id, uid));
  };
  const unlike = () => {
    dispatch(unlikePost(post.id, uid));
  };

  useEffect(() => {
    if (post.Likes.includes(uid)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post.Likes, uid, liked]);



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
      <span>{post.Likes.length}</span>
    </div>
  );
};

export default LikeButton;
