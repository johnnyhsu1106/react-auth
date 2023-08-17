import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import ChangePassword from './ChangePassword';
import PageNotFound from './PageNotFound';
import PrivateRoute from './PrivateRoute';

import { AuthProvider } from '../context/AuthContext'

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"


function App() {

  return (
    <Container 
      className="d-flex align-items-center justify-content-center .container">
      <div className='w-100 form-wrapper'>
     
        <Router>
          <AuthProvider>
            
            <Routes>
              <Route element={<PrivateRoute/>} >
                <Route path='/' element={<Dashboard/>} />
              </Route>
              <Route element={<PrivateRoute/>} >
                <Route path='change-password' element={<ChangePassword/>} />
              </Route>
              <Route path='signup' element={<Signup/>} />
              <Route path='login' element={<Login/>} />
              <Route path='reset-password' element={<ResetPassword/>} />
              <Route path='*' element={<PageNotFound/>} />
            </Routes>

          </AuthProvider>
        </Router>
      </div>
      
    </Container>
  )
}

export default App;
