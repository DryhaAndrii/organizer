import { useCallback, useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLogin, setUserLogin] = useState('');

  const auth = useCallback((login) => {
    setUserLogin(login);
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    fetch('/api/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('unauth');
      })
      .then(data => {
        setUserLogin(data.login);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUserLogin('');
      });
  }, []);

  return { isAuthenticated, setIsAuthenticated, userLogin, setUserLogin, auth };
}


