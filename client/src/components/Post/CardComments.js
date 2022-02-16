import React, { useState } from 'react';

// Actions
import { addComment, getPosts } from '../../actions/post.actions';

// Components
import DeleteComment from './DeleteComment';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Styles
import { Container, Form, FormControl, Button, Image, Card } from 'react-bootstrap';

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

          <Container fluid key={comment.id}>
            <Card style={{ width: '14rem' }}>
              <Card.Header className='d-flex justify-content-between'>
                <Image
                  roundedCircle
                  width={40}
                  height={40}
                  src={comment.User.avatar}
                  alt="avatar"
                />
                <Card.Title className='mt-auto'>
                  {comment.User.username}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {comment.message}
                </Card.Text>
              </Card.Body>
            </Card>

            <DeleteComment comment={comment} />
          </Container>
        )
      })}

      {userData.id && (

        <Form
          action=''
          onSubmit={handleComment}
          className="comment-form"
        >
          <FormControl
            className="w-50"
            type='text'
            name='text'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ajouter un commentaire"
          />
          <Button
            type='submit'
            className='mt-2'
            variant="outline-primary">
            Ajouter
          </Button>
        </Form>

      )}

    </Container>

  )
};

export default CardComments;
