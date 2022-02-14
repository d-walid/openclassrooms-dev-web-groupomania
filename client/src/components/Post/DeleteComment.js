import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../actions/post.actions';
import { UidContext } from '../Context/AppContext';


const DeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer);

  const handleDelete = () => {
    dispatch(deleteComment(comment.id, uid, postId));
  }

  useEffect(() => {
    const checkAuthor = () => {
      if (userData.id === comment.UserId || userData.isAdmin === true) {
        setIsAuthor(true);
      }
    }
    checkAuthor();
  }, [])

  return (
    <div className="delete-comment">
      {isAuthor && (
        <span onClick={() => {
          if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
            handleDelete();
            window.location.reload();
          }
        }}>
          <img src="./img/icons/trash.svg" alt="trash" />
        </span>
      )}
    </div>
  )
};

export default DeleteComment;
