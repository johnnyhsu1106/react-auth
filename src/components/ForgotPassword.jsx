import { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import Message from './Message'

import { useAuthContext } from '../contexts/AuthContext'

const ForgotPassword = () => {
 
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { resetPassword } = useAuthContext();
  const emailRef = useRef();
  const navigate = useNavigate();


  async function handleFormSubmit(e) {
    e.preventDefault()

    try {
      setSuccessMsg('')
      setErrorMsg('')
      setIsLoading(true)

      await resetPassword(emailRef.current.value);
      setSuccessMsg('Check your inbox for reset your password. Page will be redirected in 3 sec');
      
      setTimeout(() => {
        navigate('/login');
        
      }, 3000)
      
    } catch (err) {
      setErrorMsg(`Failed to reset password. ${message}`);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {errorMsg && <Message type='danger' message={errorMsg}/>}
          {successMsg && <Message type='success' message={successMsg} />}

          <Form onSubmit={handleFormSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>

            <Button disabled={isLoading} className='w-100 mt-4' type='submit'>
              Reset Password
            </Button>
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

export default ForgotPassword;