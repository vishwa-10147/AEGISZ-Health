import { useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = (username: string, _password: string) => {
    const fakeToken = btoa(username + ':dummy-token');
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, login, logout, isAuthenticated: !!token };
}
