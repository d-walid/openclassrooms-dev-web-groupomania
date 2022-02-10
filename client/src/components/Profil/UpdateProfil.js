import React, { useState } from 'react';
import { Card, Container, Image, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils/Utils';
import DeleteProfil from './DeleteProfil';
import UploadImage from './UploadImage';

const UpdateProfil = () => {
  const [biography, setBiography] = useState('');
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData.id, biography));
    setUpdateForm(false);
  };

  return (
    <Container>
      <Row>

        <Col sm={7}>
          <Card className='mb-3'>
            <Card.Header as='h3'>{userData.username}</Card.Header>
            <Card.Body>
              <Image
                width={100}
                height={100}
                src={userData.avatar}
                alt="avatar"
              />
              <UploadImage />
            </Card.Body>
          </Card>
        </Col>

        <Col sm={5}>
          <Card>
            <Card.Header as='h3'>Mes informations</Card.Header>
            <Card.Body>
              <Card.Title>
                <h5>Biographie</h5>
              </Card.Title>
              <Card.Text onClick={() => setUpdateForm(!updateForm)}>
                {userData.biography}
              </Card.Text>
            </Card.Body>

            {updateForm === false && (
              <Button variant='secondary' onClick={() => setUpdateForm(!updateForm)}>
                Modifier ma biographie
              </Button>
            )}

            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.biography}
                  onChange={e => setBiography(e.target.value)}
                ></textarea>
                <Button onClick={handleUpdate}>Valider</Button>
              </>
            )}

            <Card.Footer>
              <h6>Membre depuis {dateParser(userData.createdAt)}</h6>
              <DeleteProfil />
            </Card.Footer>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default UpdateProfil;
