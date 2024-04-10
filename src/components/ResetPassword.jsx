import { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Message from './shared/Message';
import EmailInput from './shared/EmailInput';
import FormButton from './shared/FormButton';

import { useAuthContext } from '../context/AuthContext'

const ResetPassword = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const { resetPassword } = useAuthContext();
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleResetPasswordFormSubmit = async (e) => {
    e.preventDefault();
  
    setIsLoading(true)
    setErrorMsg('')

    try {
      await resetPassword(emailRef.current?.value || '');
      setSuccessMsg('Check your inbox for reset your password.');
      setIsSucceed(true);

      setTimeout(() => {
        navigate('/login');
      }, 3000)
      
    } catch (err) {
      setErrorMsg('Failed to reset password');
      setIsSucceed(false);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {errorMsg && <Message type='danger' message={errorMsg}/>}
          {successMsg && <Message type='success' message={successMsg} />}

          <Form onSubmit={handleResetPasswordFormSubmit}>
            <EmailInput ref={emailRef} />
            <FormButton
              variant='primary'
              disabled={isLoading || isSucceed}
              className='w-100 mt-4'
              type='submit'
              text='Reset Password'
            />  
          </Form>

          <div className='w-100 text-center mt-3'>
            <Link to='/login'>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  )
}

export default ResetPassword;