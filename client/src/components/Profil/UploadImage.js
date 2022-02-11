import React, { useState } from 'react';

// Actions
import { uploadPicture } from '../../actions/user.actions';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Styles
import { Form, Button } from 'react-bootstrap';

const UploadImage = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer);

  const handleAvatar = event => {
    event.preventDefault();

    const data = new FormData();
    data.append('file', file);

    dispatch(uploadPicture(data, userData.id));
    console.log(userData);
  };

  return (
    <Form
      className='mt-2'
      encType='multipart/form-data'
      onSubmit={handleAvatar}
    >
      <Form.Group>
        <Form.Control
          type='file'
          id='file'
          name='file'
          accept='.jpg, .jpeg, .png'
          onChange={event => setFile(event.target.files[0])}
        />
      </Form.Group>
      <Button className='mt-2' variant='primary' type='submit'>Envoyer</Button>
    </Form>
  );
};

export default UploadImage;
