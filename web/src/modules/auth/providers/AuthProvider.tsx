import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "../../shared/hooks";

type AuthContextType = {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  onLogin: () => {},
  onLogout: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage<string | null>('access_token', null);

  const isAuthenticated = !!token;

  const onLogin = async () => {
    // const token = await fakeAuth();
    // setToken(token);

    setToken('token');
    navigate('/dashboard');
  };

  const onLogout = () => {
    setToken(null);
    navigate('/');
  };

  const value = {
    isAuthenticated,
    onLogin,
    onLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};