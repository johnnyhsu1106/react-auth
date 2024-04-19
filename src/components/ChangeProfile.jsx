import { useState, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import Message from './shared/Message';
import EmailInput from './shared/EmailInput';
import PasswordInput from './shared/PasswordInput';
import FormHeading from './shared/FormHeading';
import FormButton from './shared/FormButton';
import FormFooter from './shared/FormFooter';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { REDIRECTION_TIMEOUT } from '../const';


const ChangeProfile = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const { 
    user, 
    changeEmail, 
    changePassword 
  } = useAuthContext();
  
  const navigate = useNavigate();

  const handleChangeProfileFormSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current?.value.trim() !== passwordConfirmRef.current?.value.trim()) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg('');
      console.log(emailRef.current?.value);
      await changeEmail(emailRef.current?.value);  
      if (passwordRef.current?.value !== '' && passwordConfirmRef.current?.value !== '') {
      await changePassword(passwordRef.current.value);
      }
      setSuccessMsg(`Profile has been updated.`);
      setIsSucceed(true);
      setTimeout(() => {
        navigate('/login');    
      }, REDIRECTION_TIMEOUT)
      
    } catch (err) {
      setErrorMsg('Failed to change profile');
      setIsSucceed(false);

    } finally {
      setIsLoading(false);
  }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <FormHeading text='Change Profile' />
          <Message type='danger' message={errorMsg}/>
          <Message type='success' message={successMsg} />
          <Form onSubmit={handleChangeProfileFormSubmit}>
            <EmailInput
              className='mb-3'
              ref={emailRef}
              defaultValue={user.email}
            />
            <PasswordInput
              className='mb-4'
              placeholder='Leave blank to keep the same password' 
              ref={passwordRef}
              required={false}
            />
            <PasswordInput
              className='mb-4' 
              placeholder='Leave blank to keep the same password'
              ref={passwordConfirmRef}
              required={false}
            /> 
            <FormButton
              className='w-100' 
              isLoading={isLoading}
              isSucceed={isSucceed}
              text='Update'
              type='submit'
              variant='primary'  
            />  
          </Form>
        </Card.Body>
      </Card>
      <FormFooter>
        <Button variant="link" onClick={() => {navigate(-1)}}> 
          Cancel          
        </Button>
      </FormFooter>
    </>
  )
}

export default ChangeProfile;
