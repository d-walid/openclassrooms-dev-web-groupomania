import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../actions/user.actions'

const DeleteProfil = () => {
  const userData = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteUser(userData.id))

  return (
    <Button
      className='mt-2 mb-2'
      variant='danger'
      onClick={() => {
        if (window.confirm('Voulez-vous supprimer votre profil?')) {
          handleDelete();
          window.location.href = '/';
        }
      }}
    >Supprimer son profil</Button>
  )
}

export default DeleteProfil