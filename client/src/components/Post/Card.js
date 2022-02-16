import React, { useEffect, useState } from 'react';

// Actions
import { updatePost } from '../../actions/post.actions';

// Components
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Styles
import { Card as CardBootstrap, Image, Col, Button, Container, FormControl } from 'react-bootstrap';

// Utils
import { dateParser, isEmpty } from '../Utils/Utils';

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const postsData = useSelector(state => state.postReducer);
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

    <Container className='mb-5' key={post.id}>

      {isLoading ? (
        <h6>Chargement</h6>
      ) : (
        <>
          {/* Bloc Header & Date du post */}

          <CardBootstrap>
            <CardBootstrap.Header className='d-flex'>
              <Image
                style={{ marginRight: '10px' }}
                className='mb-3'
                width={100}
                height={100}
                roundedCircle
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
              {!isEmpty(postsData[0]) &&
                postsData.map(user => {
                  if (user.id === post.id) {
                    return (

                      <CardBootstrap.Title className='mt-auto mb-auto'>
                        <h4>{user.User.username}</h4>
                        <h6>{dateParser(post.createdAt)}</h6>
                      </CardBootstrap.Title>

                    );
                  }
                  else return null;
                })}
            </CardBootstrap.Header>

            {isUpdated === false && (
              <>

                <CardBootstrap.Body>
                  <CardBootstrap.Text>
                    {post.message}
                  </CardBootstrap.Text>
                </CardBootstrap.Body>
              </>
            )}

            {post.imageUrl && (
              <Col sm={4}>
                <Image
                  className='mb-4'
                  width={300}
                  height={300}
                  fluid={true}
                  src={post.imageUrl}
                  alt="post-img"
                />
              </Col>
            )}

            {post.link && (
              <Col sm={4}>
                <iframe
                  className='mb-4'
                  title="post-video"
                  width="300"
                  height="300"
                  src={post.link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Col>
            )}
          </CardBootstrap>

          {isUpdated && (
            <>
              <FormControl
                as="textarea"
                size="md"
                rows="3"
                name='message'
                id='message'
                defaultValue={post.message}
                onChange={(event) => setTextUpdate(event.target.value)}
                value={textUpdate}
              />
              <div className="button-container">
                <Button className='mt-3 mb-3' onClick={updateItem}>
                  Valider
                </Button>
              </div>
            </>
          )}



          {userData.id === post.User.id ? (
            <>

              <Image
                className='mt-2'
                width={35}
                height={35}
                fluid={true}
                onClick={() => setIsUpdated(!isUpdated)} src="./img/icons/edit.svg" alt="edit"
              />
              <DeleteCard id={post.id} />
            </>

          ) : (
            userData.isAdmin && (

              <>
                <Image
                  width={35}
                  height={35}
                  fluid={true}
                  onClick={() => setIsUpdated(!isUpdated)} src="./img/icons/edit.svg" alt="edit"
                />
                <DeleteCard id={post.id} />
              </>

            )
          )}

          {/* Bloc et icone commentaire */}
          <Image
            className='mt-2'
            width={35}
            height={35}
            fluid={true}
            onClick={() => setShowComments(!showComments)}
            src="./img/icons/message1.svg"
            alt='message'
          />

          <span>{post.Comments.length}</span>
          {showComments && <CardComments post={post} />}
        </>
      )}
    </Container>

  );
};

export default Card;
