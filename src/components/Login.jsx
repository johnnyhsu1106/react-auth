import { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Message from './Message';
import { useAuthContext } from '../contexts/AuthContext';


const Login = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();
  const navigation = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  
  const handLoginleSubmit = async (e) => {
    e.preventDefault();

    try { 
      setError('')
      setIsLoading(true)
      await login(emailRef.current.value, passwordRef.current.value);
      navigation('/');

    } catch (err) {
      const { message } = err;
      setError(`Failed to log in. ${message}`);

    }

    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          { error && <Message type='danger' message={error} /> }

          <Form onSubmit={handLoginleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            
            <Button disabled={isLoading} className='w-100 mt-4' type='submit'>
              Login
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>

        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  )
}

export default Login;
