import { Container } from 'react-bootstrap';

import Signup from './Signup';
import { AuthProvider } from '../contexts/AuthContext'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Container 
      className="d-flex align-items-center justify-content-center .container">
      <div className='w-100 form-wrapper'>
        <AuthProvider>
          <Signup />
        </AuthProvider>
      </div>
      
    </Container>
  )
}

export default App
