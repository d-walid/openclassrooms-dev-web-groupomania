import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils/Utils';
import Image from 'react-bootstrap/Image';
import LikeButton from './LikeButton';
import { updatePost } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const postsData = useSelector(state => state.postReducer);
  const usersData = useSelector(state => state.usersReducer);
  const userData = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate))
    }
    setIsUpdated(false);
  }

  useEffect(() => {
    !isEmpty(postsData[0]) && setIsLoading(false);
  }, [postsData]);

  return (
    <div className="card-container" key={post.id}>
      {isLoading ? (
        <h6>Chargement</h6>
      ) : (
        <>
          <div>
            <Image
              width={200}
              height={200}
              fluid={true}
              src={
                !isEmpty(postsData[0]) &&
                postsData
                  .map(user => {
                    if (user.id === post.id) return user.User.avatar;
                    else return null;
                  })
                  .join('')
              }
              alt="avatar"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(postsData[0]) &&
                    postsData.map(user => {
                      // if the user id is the same as the post user id then return the username
                      if (user.id === post.id) return user.User.username;
                      else return null;
                    })}
                </h3>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(event) => setTextUpdate(event.target.value)}
                />
                <div className="button-container">
                  <div className="btn" onClick={updateItem}>
                    Valider
                  </div>
                </div>
              </div>
            )}
            <div className="card-body">
              {post.imageUrl && (
                <Image
                  width={400}
                  height={400}
                  fluid={true}
                  src={post.imageUrl}
                  alt="post-img"
                />
              )}
              {post.link && (
                <iframe
                  width="500"
                  height="300"
                  src={post.link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
              {userData.id === post.User.id && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./img/icons/edit.svg" alt="edit" />
                  </div>
                  <DeleteCard id={post.id} />
                </div>
              )}
              <div className="card-footer">
                <div className="comment-icon">
                  <img
                    onClick={() => setShowComments(!showComments)}
                    src="./img/icons/message1.svg" />
                  <span>{post.Comments.length}</span>
                </div>
                <LikeButton post={post} />
              </div>
              {showComments && <CardComments post={post} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
