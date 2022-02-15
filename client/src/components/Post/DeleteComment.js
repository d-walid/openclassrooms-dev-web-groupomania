import React, { useContext, useEffect, useState } from 'react';

// Actions
import { deleteComment } from '../../actions/post.actions';

// Context
import { UidContext } from '../Context/AppContext';

// Redux 
import { useDispatch, useSelector } from 'react-redux';

// Styles 
import { Image } from 'react-bootstrap';


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

    <div className="delete-comment mb-3">
      {isAuthor && (
        <span onClick={() => {
          if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
            handleDelete();
            window.location.reload();
          }
        }}
        >

          <Image
            width={35}
            height={35}
            fluid={true}
            src="./img/icons/trash.svg" alt="trash"
          />

        </span>
      )}

    </div>
  )
};

export default DeleteComment;
