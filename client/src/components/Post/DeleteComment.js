import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../actions/post.actions';
import { UidContext } from '../Context/AppContext';


const DeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteComment(postId, comment));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.UserId) {
        setIsAuthor(true);
      }
    }
    checkAuthor();
  }, [uid, comment.UserId]);



  return (
    <div className="delete-comment">
      {isAuthor && (
        <span onClick={() => {
          if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
            handleDelete();
          }
        }}>
          <img src="./img/icons/trash.svg" alt="trash" />
        </span>
      )}
    </div>
  )
};

export default DeleteComment;
