import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../appwriteConfig';
import { ID } from 'appwrite';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';

interface AuthContextValue {
  user: any;
  loginUser: (userInfo: { email: string; password: string }) => Promise<void>;
  logoutUser: () => void;
  registerUser: (userInfo: {
    email: string;
    password1: string;
    name: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo: { email: string; password: string }) => {
    setLoading(true);
    try {
      // let accountDetails = await account.get();
      // setUser(accountDetails);
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password,
      ); // create a new session for the user
      let accountDetails = await account.get(); // get the updated account details
      setUser(accountDetails); // set the user state to the updated account details
      navigate('/');
      console.log(accountDetails);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const logoutUser = () => {
    account.deleteSession('current');
    setUser(null); // if user is logged out, set the user state to null
    navigate('/auth/welcomeback'); // redirect the user to the login page after logging out after logging out
    setLoading(false);
    console.log('Logged out');
  };

  const registerUser = async (userInfo: {
    email: string;
    password1: string;
    name: string;
  }) => {
    setLoading(true);
    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name,
      ); // create a new user account
      console.log('RESPONSE:', response);
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password1,
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails); // if user is logged in, set the user state to the account details
    } catch (error) {
      navigate('/auth/welcomeback'); // if user is not logged in, redirect the user to the login page
      setUser(null);
      console.log(error);
    }

    setLoading(false);
  }; // check if user is logged in or not

  const contextData: AuthContextValue = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
