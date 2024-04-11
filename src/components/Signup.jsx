import { useRef, useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Message from './shared/Message';
import EmailInput from './shared/EmailInput';
import PasswordInput from './shared/PasswordInput';
import FormButton from './shared/FormButton';
import { useAuthContext } from '../context/AuthContext';
import { REDIRECTION_TIMEOUT } from '../const';


const Signup = () => {
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { signup } = useAuthContext();
  const navigate = useNavigate();


  const handSignupFormSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordRef.current?.value.trim() === '' || passwordConfirmRef.current?.value.trim() === '') {
      setErrorMsg('Please enter password');
      return;
    }   

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      setErrorMsg("Passwords do not match");
      return;
    } 


    try {
      setIsLoading(true)
      setErrorMsg('');      
      await signup(emailRef.current?.value || '', passwordRef.current?.value || '');
      setSuccessMsg('New Account is created.');
      setIsSucceed(true);
      setTimeout(() => {
        navigate('/');
      }, REDIRECTION_TIMEOUT);
      
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
          {errorMsg ? <Message type='danger' message={errorMsg}/> : null}
          {successMsg ? <Message type='success' message={successMsg} /> : null}

          <Form onSubmit={handSignupFormSubmit}>  
            <EmailInput
              className='mb-3'
              ref={emailRef} 
            />
            <PasswordInput
              className='mb-3'
              placeholder='Must have a least 6 characters' 
              ref={passwordRef}
            />
            <PasswordInput 
              className='mb-3'
              placeholder='confirm your password'
              ref={passwordConfirmRef}
            />
            <FormButton
              className='w-100'
              isLoading={isLoading}
              isSucceed={isSucceed}
              text='Sign Up'
              type='submit'
              variant='primary'
            />            
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
