import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../appwriteConfig';
import { ID } from 'appwrite';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';

interface AuthContextValue {
  user: any;
  // loginUser: (userInfo: { email: string; password: string }) => Promise<void>;
  logoutUser: () => void;
  registerUser: (userInfo: {
    email: string;
    password1: string;
    name: string;
  }) => Promise<void>;
  handleLogin: (userInfo: {
    username: string;
    password: string;
  }) => Promise<void>;
  fetchWithAuth: (url: string, options?: {}) => Promise<Response>;
  fetchUsers: () => Promise<void>;
  // addUsersWithAuth: (url: string, options?: {}) => Promise<Response>;
  AddNewUser: (userInfo: {
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    email: string;
    role: string;
    branchId: string;
    password: string;
  }) => Promise<void>;
  updateUser: (userInfo: {
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    email: string;
    role: string;
    branchId: string;
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

  // const loginUser = async (userInfo: { email: string; password: string }) => {
  //   setLoading(true);
  //   try {
  //     await account.createEmailPasswordSession(
  //       userInfo.email,
  //       userInfo.password,
  //     ); // create a new session for the user
  //     let accountDetails = await account.get(); // get the updated account details
  //     setUser(accountDetails); // set the user state to the updated account details
  //     navigate('/');
  //     console.log(accountDetails);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setLoading(false);
  // };

  const handleLogin = async (userInfo: {
    username: string;
    password: string;
  }) => {
    // event.preventDefault();

    const payload = {
      username: userInfo.username,
      password: userInfo.password,
      // setSuccess: event.target.setSuccess,
      // setError: event.target.setError,
    };

    try {
      const response = await fetch('http://185.4.176.195:8989/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      // const access = data.data.accessToken;
      // console.log(access);
      // console.log(data.data);

      if (response.ok) {
        localStorage.setItem('authToken', data.data.accessToken);
        alert('Login successful!');
        navigate('/');
        console.log(typeof localStorage.getItem('authToken'));
        // Redirect or update the UI as needed
      } else {
        // setError(data.message || 'Login failed');
        navigate('/auth/welcomeBack');
        console.log('not authenticated');
        // notify2();
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    navigate('/auth/welcomeback'); // redirect the user to the login page after logging out after logging out
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
    // try {
    //   let accountDetails = await account.get();
    //   setUser(accountDetails); // if user is logged in, set the user state to the account details
    // } catch (error) {
    navigate('/auth/welcomeback'); // if user is not logged in, redirect the user to the login page
    //   setUser(null);
    //   console.log(error);
    // }

    setLoading(false);
  }; // check if user is logged in or not

  const fetchUsers = async () => {
    const token = localStorage.getItem('authToken');
    console.log(typeof token);
    try {
      const response = await fetch('http://185.4.176.195:8989/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          // Authorization: 'Basic' + btoa('mustapha@jtfish.ng:password'),
        },
      });
      const data = await response.json();
      console.log(typeof token);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchWithAuth = async (url: string, { options = {} }: any) => {
    const token = localStorage.getItem('authToken');
    // console.log(typeof token);
    const headers = {
      ...options.headers,
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    return response;
  };

  const AddNewUser = async (userInfo: {
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    email: string;
    role: string;
    branchId: string;
    password: string;
  }) => {
    setLoading(true);
    // setError(null);
    try {
      const response = await fetch('http://185.4.176.195:8989/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User Added successfully');
        console.log(data.message);
        console.log(data.data);
        navigate('/UserManagement');
      } else {
        // setError(data.message || 'User not Added');
        console.log('User not Added');
        alert('User not Added');
        navigate('/UserManagement');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  const updateUser = async (userInfo: {
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    email: string;
    role: string;
    branchId: string;
  }) => {
    // setIsLoading(true);
    // setError(null);
    try {
      const response = await fetch('http://185.4.176.195:8989/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User updated successfully');
        console.log('User updated successfully');
        console.log(data.data);
        navigate('/UserManagement');
      } else {
        // setError(data.message || 'User not updated');
        console.log('User not updated');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  const contextData: AuthContextValue = {
    user,
    handleLogin,
    logoutUser,
    registerUser,
    fetchWithAuth,
    fetchUsers,
    AddNewUser,
    updateUser,
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
