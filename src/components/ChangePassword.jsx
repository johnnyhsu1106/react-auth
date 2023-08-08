import { useState, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

import Message from './Message';
import { useAuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { changePassword } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (passwordRef.current.value.trim() === '') {
      setErrorMsg('Please enter password');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await changePassword(passwordRef.current.value);
      setSuccessMsg('Password has been updated. Page will be redirected in 1 sec');
      setTimeout(() => {
        navigate('/login');    
      }, 5000)
      

    } catch (err) {
      const { message } = err;
      setErrorMsg(`Failed to update account ${message}`);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Change Password</h2>
          {errorMsg && <Message type='danger' message={errorMsg}/>}
          {successMsg && <Message type='success' message={successMsg} />}

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
