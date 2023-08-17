import { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import Message from './Message'

import { useAuthContext } from '../context/AuthContext'

const ResetPassword = () => {
 
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
      setSuccessMsg('Check your inbox for reset your password. Page will be redirected now');
      setTimeout(() => {
        navigate('/login');
        
      }, 1500)
      
    } catch (err) {
      setErrorMsg('Failed to reset password');
      setIsLoading(false);
    }
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
              <Form.Control 
                placeholder='example@gmail.com'
                type='email' 
                ref={emailRef} 
                required />
            </Form.Group>

            <Button 
              variant='primary'
              disabled={isLoading} 
              className='w-100 mt-4' 
              type='submit'
            >
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

export default ResetPassword;