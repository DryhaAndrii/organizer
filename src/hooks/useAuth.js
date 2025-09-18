import { useCallback, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLogin, setUserLogin] = useState('');

  const auth = useCallback((login) => {
    setUserLogin(login);
    setIsAuthenticated(true);
  }, []);

  return { isAuthenticated, setIsAuthenticated, userLogin, setUserLogin, auth };
}


