import React, { useEffect, useState } from 'react';

// Actions
import { addPost, getPosts } from '../../actions/post.actions';

// Redux 
import { useSelector, useDispatch } from 'react-redux';

// Styles
import { Button, Card, Container, Image, FormControl, Form } from 'react-bootstrap';

// Utils 
import { isEmpty, timestampParser } from '../Utils/Utils';


const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [postPicture, setPostPicture] = useState(null);
  const [link, setLink] = useState('');
  const [file, setFile] = useState();

  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePicture = (event) => {
    setPostPicture(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
    setLink('')
  }

  const handlePost = async () => {
    if (message || postPicture || link) {
      const data = new FormData();
      data.append('message', message);
      data.append('posterId', userData.id);
      if (file) data.append('file', file);
      data.append('link', link);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert('Veuillez entrer un message.')
    }
  }

  const cancelPost = () => {
    setMessage('');
    setPostPicture('');
    setLink('');
    setFile('');
  }

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLinkYoutube = message.split(' ');
      for (let i = 0; i < findLinkYoutube.length; i++) {
        if (
          findLinkYoutube[i].includes('https://www.yout') ||
          findLinkYoutube[i].includes('https://yout')
        ) {
          let embedVideo = findLinkYoutube[i].replace('watch?v=', 'embed/');
          setLink(embedVideo.split('&')[0]);
          findLinkYoutube.splice(i, 1);
          setMessage(findLinkYoutube.join(' '));
          setPostPicture('')
        }
      }
    };
    handleVideo();
  }, [userData, message, link])

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData])

  return (

    <Container>
      {isLoading ? (
        <h6>Chargement</h6>
      ) : (
        <>

          <Card style={{ width: '60%' }} >
            <Card.Header className='d-flex justify-content-evenly'>
              <Image
                className='mb-2'
                roundedCircle
                width={100}
                height={100}
                src={userData.avatar}
                alt="avatar-post-author"
              />
              <Card.Title
                className='mt-auto mb-auto'>
                {userData.username}
              </Card.Title>
            </Card.Header>
            <FormControl
              as="textarea"
              size="md"
              rows="3"
              name='message'
              id='message'
              placeholder='Dites quelque chose...'
              onChange={(event) => setMessage(event.target.value)}
              value={message}
            />
          </Card>

          {message || postPicture || link.length > 20 ? (
            <Container fluid className='mt-5'>
              <Card>
                <Card.Header className='d-flex'>
                  <Image
                    style={{ marginRight: '10px' }}
                    roundedCircle
                    width={75}
                    height={75}
                    src={userData.avatar}
                    alt="avatar-post-author"
                  />
                  <Card.Title className='mt-auto mb-auto'>
                    {userData.username}
                    <h6>{timestampParser(Date.now())}</h6>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    {message}
                  </Card.Text>

                  <Image src={postPicture} alt='' />
                  {link && (
                    <iframe
                      title='link'
                      width="415"
                      height="400"
                      src={link}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </Card.Body>

              </Card>


            </Container>
          ) : null}

          <div className="icon">
            {isEmpty(link) && (
              <>
                <Form.Group controlId="formFile" className="mt-3 mb-3">
                  <Form.Control
                    className="w-25"
                    type="file"
                    onChange={handlePicture}
                  />
                </Form.Group>
              </>
            )}
            {link && (
              <Button
                className='mb-2'
                onClick={() => setLink('')}>
                Supprimer la vidéo
              </Button>
            )}
          </div>

          <div className='footer-post'>
            {message || postPicture || link.length > 20 ? (
              <Button
                style={{ marginRight: '10px' }}
                variant='secondary'
                onClick={cancelPost}>
                Annuler
              </Button>
            ) : null}
            <Button
              variant='primary'
              onClick={handlePost}>
              Envoyer
            </Button>
          </div>

        </>

      )}
    </Container>
  )
};

export default NewPostForm;
