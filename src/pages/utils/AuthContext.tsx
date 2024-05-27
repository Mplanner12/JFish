import { createContext, useContext, useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { useNavigate } from 'react-router-dom';

interface AuthContextValue {
  user: any;

  // Custom Fetch with Auth
  fetchWithAuth: (url: string, options?: {}) => Promise<Response>;
  fetchUsers: () => Promise<void>;

  // User Management
  logoutUser: () => void;
  handleLogin: (userInfo: {
    username: string;
    password: string;
  }) => Promise<void>;
  AddNewUser: (userInfo: {
    id: string;
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
    id: string;
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    email: string;
    role: string;
    branchId: string;
  }) => Promise<void>;
  deleteUser: (id: { id: string }) => Promise<void>;

  //  Branch Management
  AddNewBranch: (branchInfo: {
    name: string;
    address: string;
  }) => Promise<void>;
  UpdateBranch: (branchInfo: {
    id: string;
    name: string;
    address: string;
  }) => Promise<void>;
  DeleteBranch: (id: { id: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user] = useState<any | null>(null);
  const navigate = useNavigate();

  // check if user is logged in or not
  useEffect(() => {
    checkUserStatus();
    // setInterval(() => {
    //   localStorage.removeItem('authToken');
    //   navigate('/auth/welcomeback');
    // }, 3600);
  }, []);

  const checkUserStatus = async () => {
    let token = localStorage.getItem('authToken');
    if (token !== null || token !== undefined || token !== '') {
      navigate('/');
    } else {
      navigate('/auth/welcomeback');
    }

    setLoading(false);
  };

  // USER AUTHENTICATION
  const handleLogin = async (userInfo: {
    username: string;
    password: string;
  }) => {
    const payload = {
      username: userInfo.username,
      password: userInfo.password,
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

      if (response.ok) {
        let token = data.data.accessToken;
        console.log(token);
        localStorage.setItem('authToken', data.data.accessToken);
        alert('Login successful!');
        navigate('/');
        console.log(typeof localStorage.getItem('authToken'));
        // Redirect or update the UI as needed
      } else {
        navigate('/auth/welcomeBack');
        console.log('not authenticated');
        // notify2();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    navigate('/auth/welcomeback'); // redirect the user to the login page after logging out after logging out
    console.log('Logged out');
  };

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

  // CUSTOM FETCH WITH AUTH
  const fetchWithAuth = async (url: string, { options = {} }: any) => {
    const token = localStorage.getItem('authToken');
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    return response;
  };

  // USER MANAGEMENT

  const AddNewUser = async (userInfo: {
    id: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    phone: string;
    branchId: string;
    password: string;
    role: string;
  }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(token);
    console.log(userInfo);
    try {
      const response = await fetch('http://185.4.176.195:8989/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User Added successfully');
        console.log(data.message);
        console.log(data.data);
      } else {
        // setError(data.message || 'User not Added');
        console.log('User not Added');
        alert('User not Added');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/UserManagement');
  };

  const updateUser = async (userInfo: {
    id: string;
    firstname: string;
    middlename: string;
    lastname: string;
    phone: string;
    email: string;
    role: string;
    branchId: string;
  }) => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    try {
      const response = await fetch('http://185.4.176.195:8989/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
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
      setLoading(false);
    }
  };

  const deleteUser = async (id: { id: string }) => {
    // setIsLoading(true);
    // setError(null);
    const token = localStorage.getItem('authToken');
    console.log(token);
    try {
      const response = await fetch(
        `http://185.4.176.195:8989/api/users/${id.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          redirect: 'follow',
          // body: JSON.stringify(id),
        },
      );
      console.log(id);
      // const data = await response.json();

      if (response.ok) {
        alert('User deleted successfully');
        console.log('User deleted successfully');
        navigate('/UserManagement');
      } else {
        // setError(data.message || 'User not updated');
        console.log('User not deleted');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // BRANCH MANAGEMENT

  const AddNewBranch = async (BranchInfo: {
    name: string;
    address: string;
  }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(token);
    console.log(BranchInfo);
    try {
      const response = await fetch('http://185.4.176.195:8989/api/branches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(BranchInfo),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Branch Added successfully');
        console.log(data.message);
        console.log(data.data);
      } else {
        // setError(data.message || 'User not Added');
        console.log('Branch not Added');
        alert('Branch not Added');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/BranchManagement');
  };

  const UpdateBranch = async (BranchInfo: {
    id: string;
    name: string;
    address: string;
  }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(BranchInfo);
    try {
      const response = await fetch('http://185.4.176.195:8989/api/branches', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(BranchInfo),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Branch Updated successfully');
        console.log(data.message);
        console.log(data.data);
      } else {
        // setError(data.message || 'User not Added');
        console.log('Branch not Updated');
        alert('Branch not Updated');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/BranchManagement');
  };

  const DeleteBranch = async (id: { id: string }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(id);
    try {
      const response = await fetch(
        `http://185.4.176.195:8989/api/branches/${id.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // const data = await response.json();

      if (response.ok) {
        alert('Branch Deleted successfully');
        // console.log(data.message);
        // console.log(data.data);
        navigate('/BranchManagement');
      } else {
        // setError(data.message || 'User not Added');
        // console.log('Branch not Deleted');
        alert('Branch not Deleted');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/BranchManagement');
  };

  const contextData: AuthContextValue = {
    user,
    // custom fetch with auth
    fetchWithAuth,
    fetchUsers,
    // user management
    handleLogin,
    logoutUser,
    AddNewUser,
    updateUser,
    deleteUser,
    // branch management
    AddNewBranch,
    UpdateBranch,
    DeleteBranch,
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
