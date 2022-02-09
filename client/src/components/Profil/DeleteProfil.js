import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../actions/user.actions'

const DeleteProfil = () => {
  const userData = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteUser(userData.id))

  return (
    <div>
      <Button
        variant='danger'
        onClick={() => {
          if (window.confirm('Voulez-vous supprimer votre profil?')) {
            handleDelete();
            window.location.href = '/';
          }
        }}
      >Supprimer son profil</Button>
    </div>
  )
}

export default DeleteProfil