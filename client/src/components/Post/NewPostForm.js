import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, timestampParser } from '../Utils/Utils';
import { NavLink } from 'react-router-dom';
import { Button, Card, Container, Image, Row, Col } from 'react-bootstrap';
import { addPost, getPosts } from '../../actions/post.actions';


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
          <Row>
            <Col>
              <Card>
                <Image
                  roundedCircle
                  width={100}
                  height={100}
                  fluid={true}
                  src={userData.avatar}
                  alt="avatar-post-author"
                />
              </Card>
            </Col>

            <Col sm={11}>
              <textarea
                name='message'
                id='message'
                placeholder='Dites quelque chose...'
                onChange={(event) => setMessage(event.target.value)}
                value={message}
              />
            </Col>


            {message || postPicture || link.length > 20 ? (
              <div>
                <div className="card-left">
                  <Image
                    width={100}
                    height={100}
                    fluid={true}
                    src={userData.avatar}
                    alt="avatar"
                  />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.username}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className='content'>
                    <p>{message}</p>
                    <Image src={postPicture} alt='' />
                    {link && (
                      <iframe
                        title='link'
                        width="200"
                        height="200"
                        src={link}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                </div>
              </div>

            ) : null}

            <div className="footer-form">
              <div className="icon">
                {isEmpty(link) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="post-form" />
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept='.jpg, .jpeg, .png, .gif'
                      onChange={(event) => handlePicture(event)}
                    />
                  </>
                )}
                {link && (
                  <Button onClick={() => setLink('')}>Supprimer la vidéo</Button>
                )}
              </div>

              <div className="btn-send">
                {message || postPicture || link.length > 20 ? (
                  <Button variant='secondary' onClick={cancelPost}>Annuler</Button>
                ) : null}
                <Button variant='primary' onClick={handlePost}>Envoyer</Button>
              </div>

            </div>
          </Row>
        </>

      )}

    </Container>
  )
};

export default NewPostForm;
