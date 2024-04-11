import { useState, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Message from './shared/Message';
import PasswordInput from './shared/PasswordInput';
import FormButton from './shared/FormButton';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { REDIRECTION_TIMEOUT } from '../const';


const ChangePassword = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const { changePassword } = useAuthContext();

  const navigate = useNavigate();

  const handleChangePasswordFormSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current?.value.trim() === '' || passwordConfirmRef.current?.value.trim() === '') {
      setErrorMsg('Please enter password');
      return;
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg('');  
      await changePassword(passwordRef.current.value);
      setSuccessMsg(`Password has been updated.`);
      setIsSucceed(true);
      setTimeout(() => {
        navigate('/login');    
      }, REDIRECTION_TIMEOUT)
      
    } catch (err) {
      setErrorMsg('Failed to change password.');
      setIsSucceed(false);

    } finally {
      setIsLoading(false);
  }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Change Password</h2>
          {errorMsg ? <Message type='danger' message={errorMsg}/> : null}
          {successMsg ? <Message type='success' message={successMsg} /> : null}

          <Form onSubmit={handleChangePasswordFormSubmit}>
            <PasswordInput
              className='mb-4'
              placeholder='Must have a least 6 characters' 
              ref={passwordRef}
            />
            <PasswordInput 
              placeholder='confirm your password'
              ref={passwordConfirmRef}
            /> 
            <FormButton
              className='w-100 mt-4' 
              isLoading={isLoading}
              isSucceed={isSucceed}
              text='Update'
              type='submit'
              variant='primary'  
            />  
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button 
          variant="link"
          onClick={() => {navigate(-1)}}
        > 
          Cancel          
        </Button>

      </div>
    </>
  )
}

export default ChangePassword;
