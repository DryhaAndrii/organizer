import { useCallback, useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLogin, setUserLogin] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [serverUnavailable, setServerUnavailable] = useState(false);

  const auth = useCallback((login) => {
    setUserLogin(login);
    setIsAuthenticated(true);
  }, []);

  const checkAuth = useCallback(() => {
    setIsCheckingAuth(true);
    setServerUnavailable(false);
    // Если нет интернета на клиенте — сразу оффлайн
    if (typeof navigator !== 'undefined' && navigator && navigator.onLine === false) {
      setIsAuthenticated(false);
      setUserLogin('');
      setServerUnavailable(true);
      setIsCheckingAuth(false);
      return;
    }

    // Таймаут на случай "висящих" запросов
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    fetch('/api/me', { signal: controller.signal })
      .then(res => {
        if (res.ok) return res.json();
        if (res.status === 401) {
          const err = new Error('unauth');
          err.code = 'UNAUTH';
          throw err;
        }
        // Любой другой статус считаем проблемой сервера/прокси (например, 502, 503, 504)
        const err = new Error('server');
        err.code = 'SERVER';
        throw err;
      })
      .then(data => {
        setUserLogin(data.login);
        setIsAuthenticated(true);
        setServerUnavailable(false);
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setUserLogin('');
        // AbortError (таймаут), TypeError (сеть), или наши коды, отличные от UNAUTH — показываем оффлайн
        const isAbort = err && err.name === 'AbortError';
        const isNetworkError = err && err.name === 'TypeError';
        const isServerError = err && err.code === 'SERVER';
        const isUnauth = err && err.code === 'UNAUTH';
        setServerUnavailable(isAbort || isNetworkError || isServerError);
        if (isUnauth) {
          setServerUnavailable(false);
        }
      })
      .finally(() => {
        clearTimeout(timeoutId);
        setIsCheckingAuth(false);
      });
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    setIsAuthenticated,
    userLogin,
    setUserLogin,
    auth,
    isCheckingAuth,
    serverUnavailable,
    checkAuth
  };
}


