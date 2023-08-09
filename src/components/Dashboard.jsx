import { useState } from 'react';
import { Card, Button } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';

import Message from './Message';
import { useAuthContext } from '../contexts/AuthContext';


const Dashboard = () => {
  const [message, setMessage] = useState('');
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  
  const handleUserLogout = async () => {
    setMessage('')

    try {
      await logout();
      navigate('/login');      
    
    } catch (err) {
      setMessage('Failed to log out');
    }

  };

  return (
    <>
      <Card>
        <Card.Body>

          <h2 className="text-center mb-4">Profile</h2>
          {message && <Message type='danger' message={message} />}
          <div><strong>Email:</strong> { user.email }</div>
          <div><strong>Last Sign In:</strong> { user.metadata.lastSignInTime}</div>
          
          <Link 
            to="/change-password" 
            className="btn btn-primary w-100 mt-3">
            Change Password
          </Link>

        </Card.Body>
      </Card>
      
      <div className="w-100 text-center mt-2">
        <Button 
          variant="link" 
          onClick={handleUserLogout}
        >
          Log Out
        </Button>
      </div>
    </> 
  )
}

export default Dashboard;
