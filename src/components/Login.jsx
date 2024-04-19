import { useRef, useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Message from './shared/Message';
import EmailInput from './shared/EmailInput';
import PasswordInput from './shared/PasswordInput';
import FormHeading from './shared/FormHeading';
import FormButton from './shared/FormButton';
import FormFooter from './shared/FormFooter';
import { useAuthContext } from '../context/AuthContext';
import { REDIRECTION_TIMEOUT } from '../const';


const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const { login } = useAuthContext();
  const navigation = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  
  const handLoginFormSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordRef.current?.value.trim() === '') {
      setErrorMsg('Please enter password');
      return;
    }  

    try { 
      setErrorMsg('')
      setIsLoading(true)
      await login(emailRef.current.value, passwordRef.current.value);
      setIsSucceed(true);
      setTimeout(() => {
        navigation('/');
      }, REDIRECTION_TIMEOUT);
      
    } catch (err) {
      setErrorMsg('Failed to log in');
      setIsSucceed(false);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <FormHeading text='Log In' />
          <Message type='danger' message={errorMsg} />
          <Form onSubmit={handLoginFormSubmit}>
            <EmailInput
              className='mb-3'
              ref={emailRef} 
            />
            <PasswordInput
              placeholder='Enter your password' 
              ref={passwordRef}
            />
            <FormButton
              variant='primary'
              isLoading={isLoading}
              isSucceed={isSucceed}
              className='w-100 mt-4'
              type='submit'
              text='Login'
            />  
          </Form>
          
          <Link 
            className='d-flex w-100 justify-content-center mt-3' 
            to='/reset-password'
          >
            Forgot Password?
          </Link>
           
        </Card.Body>
      </Card>
      <FormFooter text='Need an account?'>
        <Link to='/signup'>Sign up</Link>
      </FormFooter>
      <div className='w-100 text-center mt-2 mb-4'>
         
      </div>

    </>
  )
}

export default Login;
