import React, { useState } from 'react';

// Actions
import { addComment, getPosts } from '../../actions/post.actions';

// Components
import DeleteComment from './DeleteComment';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Styles
import { Container, Form, FormControl, Row, Col, Button, Image } from 'react-bootstrap';

const CardComments = ({ post }) => {
  const [message, setMessage] = useState('');
  const userData = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();

    if (message) {
      dispatch(addComment(post.id, userData.id, message, userData.username))
        .then(() => dispatch(getPosts()))
        .then(() => setMessage(''));
    }
  }

  return (
    <Container className='mt-3'>

      {post.Comments.map((comment) => {
        return (
          <div key={comment.id}>
            <Row>
              <Col sm={1}>
                <Image
                  className='mt-3'
                  roundedCircle
                  width={75}
                  height={75}
                  fluid={true}
                  src={comment.User.avatar}
                  alt="avatar"
                />
              </Col>

              <h6>{comment.User.username}</h6>
              <span>{comment.message}</span>

            </Row>
            <DeleteComment comment={comment} postId={post.id} />
          </div>
        )
      })}

      {userData.id && (
        <Form
          action=''
          onSubmit={handleComment}
          className="comment-form"
        >
          <FormControl
            className='w-50'
            type='text'
            name='text'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ajouter un commentaire"
          />
          <Button type='submit' variant="outline-primary">
            Ajouter un commentaire
          </Button>
        </Form>
      )}

    </Container>
  )
};

export default CardComments;
