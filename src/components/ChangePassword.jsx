import { useState, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

import Message from './Message';
import { useAuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [error, setError] = useState('')
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { changePassword } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();


  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');
      return;
    }

    if (passwordRef.current.value.trim() === '') {
      setError('Please enter password');
      return;
    }

    setIsLoading(true)
    setError('')

    try {
      await changePassword(passwordRef.current.value);
      navigate('/login');  
    } catch (err) {
      const { message } = err;
      setError(`Failed to update account ${message}`);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Change Password</h2>
          { error && <Message type='danger' message={error} /> }

          <Form onSubmit={handleFormSubmit}>
            
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
              />
            </Form.Group>

            <Form.Group id='password-confirm'>
              <Form.Label>Comfirm Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordConfirmRef}
              />
            </Form.Group>
            
            <Button disabled={isLoading} className='w-100 mt-4' type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  )
}

export default ChangePassword;
