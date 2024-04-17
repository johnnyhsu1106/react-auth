import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged 
} from "firebase/auth";
import app from '../firebase';
import PropTypes from 'prop-types';


const auth = getAuth(app);
const AuthContext = createContext(null);

const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (auth === null) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return auth;
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  };

  const changeEmail = (email) => { 
    if (!user) {
      return new Promise((_, reject) => {
        reject('User is null');
      })
    }
    return updateEmail(user, email);
  }

  const changePassword = (password) => {
    if (!user) {
      return new Promise((_, reject) => {
        reject('User is null');
      })
    }
    return updatePassword(user, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);
  
  const value = {
    user,
    login,
    logout,
    signup, 
    resetPassword,
    changeEmail,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : null}
    </AuthContext.Provider>
  )
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useAuthContext, AuthProvider };