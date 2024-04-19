import { useState } from 'react';
import { Card, Button } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import FormHeading from './shared/FormHeading';
import FormFooter from './shared/FormFooter';
import Message from './shared/Message';
import { useAuthContext } from '../context/AuthContext';


const Dashboard = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  
  const handleUserLogout = async () => {
    try {
      setErrorMsg('')
      await logout();
      navigate('/login');      
    
    } catch (err) {
      setErrorMsg('Failed to log out');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <FormHeading text='Profile' />
          <Message type='danger' message={errorMsg} />
          <div><strong>Email: </strong> { user.email }</div>
          <div><strong>Last Sign In:</strong> { user.metadata.lastSignInTime}</div>
          <Link 
            to="/change-profile" 
            className="btn btn-primary w-100 mt-3">
            Change Profile
          </Link>
        </Card.Body>
      </Card>
      <FormFooter>
        <Button variant="link" onClick={handleUserLogout}>
          Log Out
        </Button>
      </FormFooter>
    </> 
  )
}

export default Dashboard;
