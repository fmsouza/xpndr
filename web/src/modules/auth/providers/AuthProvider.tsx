import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Maybe } from 'yup';

import { useLocalStorage } from "../../shared/hooks";

type AuthContextType = {
  isAuthenticated: boolean;
  accessToken?: Maybe<string>;
  updateToken: (input: {token: string, persist: boolean}) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  updateToken: () => {},
  logout: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const {item, setItem, removeItem} = useLocalStorage<Maybe<string>>('access_token', null);
  const [accessToken, setAccessToken] = useState<Maybe<string>>(item);

  const isAuthenticated = Boolean(accessToken);

  const updateToken = async (input: {token: string, persist: boolean}) => {
    if (input.persist) {
      setItem(input.token);
    }
    setAccessToken(input.token);
    navigate('/account/dashboard');
  };

  const logout = () => {
    removeItem();
    setAccessToken(null);
    navigate('/');
  };

  const value = {
    isAuthenticated,
    accessToken,
    updateToken,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};