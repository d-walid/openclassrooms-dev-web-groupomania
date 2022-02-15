import React, { useEffect, useState } from 'react';

// Actions
import { updatePost } from '../../actions/post.actions';

// Components
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Styles
import { Card as CardBootstrap, Image, Col, Row, Button, Container, FormControl } from 'react-bootstrap';

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
          <Row>
            <Col sm={1}>
              <Image
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
            </Col>
          </Row>

          {/* Bloc Header & Date du post */}
          <Row>
            <Col sm={4}>
              <CardBootstrap>
                <CardBootstrap.Header>
                  {!isEmpty(postsData[0]) &&
                    postsData.map(user => {
                      if (user.id === post.id) {
                        return (
                          <h4>{user.User.username}</h4>
                        );
                      }
                      else return null;
                    })}
                  <span>{dateParser(post.createdAt)}</span>
                </CardBootstrap.Header>
              </CardBootstrap>
            </Col>
          </Row>

          {isUpdated === false && (
            <>
              {/* Bloc du post */}
              <Row>
                <Col sm={4}>
                  <CardBootstrap className='mb-2'>
                    <CardBootstrap.Body>
                      <CardBootstrap.Text>
                        {post.message}
                      </CardBootstrap.Text>
                    </CardBootstrap.Body>
                  </CardBootstrap>
                </Col>
              </Row>
            </>
          )}

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

          {post.imageUrl && (

            <Col sm={4}>
              <Image
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

          {userData.id === post.User.id ? (
            <>
              <Image
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
