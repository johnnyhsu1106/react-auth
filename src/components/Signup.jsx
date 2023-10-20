import { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Message from './Message';
import { useAuthContext } from '../context/AuthContext';


const Signup = () => {
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const handSignupleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordRef.current?.value.trim() === '' || passwordConfirmRef.current?.value.trim() === '') {
      setErrorMsg('Please enter password');
      return;
    }   

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setErrorMsg("Passwords do not match");
      return;
    } 

    setIsLoading(true)
    setErrorMsg('');   

    try { 
      await signup(emailRef.current.value, passwordRef.current.value);
      setSuccessMsg('New Account is created.');
      setIsSucceed(true);
      setTimeout(() => {
        navigate('/');
      }, 1500)
      
    } catch (err) {
      setErrorMsg('Failed to create an account');
      setIsSucceed(false);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {errorMsg && <Message type='danger' message={errorMsg}/>}
          {successMsg && <Message type='success' message={successMsg} />}
          <Form onSubmit={handSignupleSubmit}>
            <Form.Group id='email' className='mb-3'>
              <Form.Control 
                type='email' 
                ref={emailRef} 
                required
                placeholder='example@gmail.com'
              />
            </Form.Group>

            <Form.Group id='password' className='mb-3'>
              <Form.Control 
                type='password' 
                ref={passwordRef} 
                required 
                placeholder='Must have a least 6 characters'
              />
            </Form.Group>

            <Form.Group id='password-confirm'>
              <Form.Control 
                type='password' 
                ref={passwordConfirmRef} 
                required 
                placeholder='confirm your password'
              />
            </Form.Group>
            
            <Button 
              variant='primary'
              disabled={isLoading || isSucceed} 
              className='w-100 mt-4' 
              type='submit'>
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
