import { useRef, useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Message from './shared/Message';
import EmailInput from './shared/EmailInput';
import FormHeading from './shared/FormHeading';
import FormButton from './shared/FormButton';
import { useAuthContext } from '../context/AuthContext'
import { REDIRECTION_TIMEOUT } from '../const';


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
  
    try {
      setIsLoading(true)
      setErrorMsg('')
      await resetPassword(emailRef.current?.value || '');
      setSuccessMsg('Check your inbox for reset your password.');
      setIsSucceed(true);

      setTimeout(() => {
        navigate('/login');
      }, REDIRECTION_TIMEOUT)
      
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
          <FormHeading text='Reset Password' />
          <Message type='danger' message={errorMsg} />
          <Message type='success' message={successMsg} />
          <Form onSubmit={handleResetPasswordFormSubmit}>
            <EmailInput ref={emailRef} />
            <FormButton
              className='w-100 mt-4' 
              isLoading={isLoading}
              isSucceed={isSucceed}
              text='Reset Password'
              type='submit'
              variant='primary'  
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