import React, { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

import Error from './Error';

const Signup = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuthContext();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const handSignupleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }    

    try { 
      setError('')
      setIsLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value);

    } catch (err) {
      setError(`Failed to create an account. ${err}`);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          { error !== '' && <Error error={error} /> }
          
          <Form onSubmit={handSignupleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>

            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            
            <Button disabled={isLoading} className='w-100 mt-4' type='submit'>
              Sign Up
            </Button>
          </Form>

        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? 
      </div>
    </>
  )
}

export default Signup;
