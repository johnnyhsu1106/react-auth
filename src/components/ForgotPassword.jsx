import { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Message from './Message'
import { useAuthContext } from '../contexts/AuthContext'

const ForgotPassword = () => {
 
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { resetPassword } = useAuthContext();
  const emailRef = useRef();


  async function handleFormSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setIsLoading(true)

      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox to reset your password');
    
    } catch (err) {
      const { message } = err;
      setError(`Failed to reset password. ${message}`);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {error && <Message type='danger' message={error}/>}
          {message && <Message type='success' message={message} />}

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