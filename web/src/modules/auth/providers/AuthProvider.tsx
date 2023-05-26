import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "../../shared/hooks";

type AuthContextType = {
  isAuthenticated: boolean;
  accessToken?: string;
  updateToken: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: undefined,
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
  const [accessToken, setAccessToken] = useLocalStorage<string | undefined>('access_token');

  const isAuthenticated = !!accessToken;

  const updateToken = async (token: string) => {
    setAccessToken(token);
    navigate('/account/dashboard');
  };

  const logout = () => {
    setAccessToken(undefined);
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