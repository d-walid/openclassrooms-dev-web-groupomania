import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils/Utils';
import { getPosts } from '../../actions/post.actions';
import Image from 'react-bootstrap/Image';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const postsData = useSelector(state => state.postReducer);

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
            <p>{post.message}</p>
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
              <div className="card-footer">
                <div className="comment-icon">
                  <img src="./img/icons/message1.svg" />
                  <span>{post.Comments.length}</span>
                </div>
                <LikeButton post={post} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
