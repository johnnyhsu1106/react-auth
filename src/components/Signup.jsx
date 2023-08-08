import { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Message from './Message';
import { useAuthContext } from '../contexts/AuthContext';


const Signup = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const handSignupleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setMessage("Passwords do not match");
      return;
    }    

    try { 
      setMessage('Password is changed successfully');
      setIsLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value);
            
    } catch (err) {
      const { message } = err;
      setMessage(`Failed to create an account. ${message}`);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          { message && <Message type='danger' message={message} /> }

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
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}

export default Signup;
