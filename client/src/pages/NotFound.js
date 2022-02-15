import React from 'react'
import { Button } from 'react-bootstrap'

const NotFound = () => {
  return (
    // Create a 404 page
    <div className='text-center'>
      <h1>Page introuvable.</h1>
      <br />
      <Button variant='primary' className='mt-3' href='/'>
        Retour à l'accueil
      </Button>
    </div>
  )
}

export default NotFound