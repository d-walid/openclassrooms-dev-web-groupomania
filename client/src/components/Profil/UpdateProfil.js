import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils/Utils';
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
    <div className="profil-page">
      <div className="profil-container">
        <h2>{userData.username}</h2>
        <img src={userData.avatar} alt="avatar" />
        <UploadImage />
      </div>
      <div className="bio-part">
        <div className="bio-container">
          <h3>Biographie</h3>
          {updateForm === false && (
            <>
              <p onClick={() => setUpdateForm(!updateForm)}>
                {userData.biography}
              </p>
              <button onClick={() => setUpdateForm(!updateForm)}>
                Modifier ma biographie
              </button>
            </>
          )}
          {updateForm && (
            <>
              <textarea
                type="text"
                defaultValue={userData.biography}
                onChange={e => setBiography(e.target.value)}
              ></textarea>
              <button onClick={handleUpdate}>Valider</button>
            </>
          )}
        </div>
        <h4>Membre depuis {dateParser(userData.createdAt)}</h4>
      </div>
    </div>
  );
};

export default UpdateProfil;
