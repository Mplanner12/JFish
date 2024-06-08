import { createContext, useContext, useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthContextValue {
  user: any;
  // Authentication
  setPassword: (userInfo: { password: string }) => Promise<void>;
  resetPassword: (userInfo: {
    userId: string;
    password: string;
  }) => Promise<void>;
  changePassword: (userInfo: {
    oldPassword: string;
    newPassword: string;
  }) => Promise<void>;
  logoutUser: () => void;
  handleLogin: (userInfo: {
    username: string;
    password: string;
  }) => Promise<void>;

  // Custom Fetch with Auth
  fetchWithAuth: (url: string, options?: {}) => Promise<Response>;
  fetchUsers: () => Promise<void>;

  // User Management
  AddNewUser: (userInfo: {
    // id: string;
    // firstname: string;
    // middlename: string;
    // lastname: string;
    // phone: string;
    // email: string;
    // role: string;
    // branchId: string;
    // password: string;
    data: string;
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
    // id: string;
    name: string;
    address: string;
  }) => Promise<void>;
  UpdateBranch: (branchInfo: {
    id: string;
    name: string;
    address: string;
  }) => Promise<void>;
  DeleteBranch: (id: { id: string }) => Promise<void>;

  // Terminal Management
  AddNewTerminal: (terminalInfo: {
    imei: string;
    serialNumber: string;
    branchId: string;
  }) => Promise<void>;
  ActivateTerminal: (terminalInfo: { serialNumber: string }) => Promise<void>;
  DeleteTerminal: (branchId: { branchId: string }) => Promise<void>;

  // Item Management
  AddNewItem: (itemInfo: {
    imageKey: string;
    imageUrl: string;
    description: string;
    itemSize: string;
    itemType: string;
    amount: number;
    stock: number;
    branch: number;
  }) => Promise<void>;
  AddItemStock: (stockInfo: {
    itemId: string;
    quantity: number;
  }) => Promise<void>;
  DeleteItem: (id: { id: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user] = useState<any | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // on resfresh or load
  useEffect(() => {
    checkUserStatus();
    deleteSession();
  }, []);

  // delete's user session after 1 hour
  const deleteSession = () => {
    setTimeout(() => {
      logoutUser();
      alert('Session Expired, Please Login Again');
    }, 3600000);
  };

  // check if user is logged in or not
  const checkUserStatus = async () => {
    let token = localStorage.getItem('authToken');
    if (token !== null || token !== undefined || token !== '') {
      navigate(location.pathname);
    } else {
      navigate('/auth/welcomeback');
    }

    setLoading(false);
  };

  // USER AUTHENTICATION
  // const getUserInfo = async (userInfo: {
  //   username: string;
  //   password: string;
  // }) => {
  //   const payload = {
  //     username: userInfo.username,
  //     password: userInfo.password,
  //   };

  //   try {
  //     const response = await fetch('http://185.4.176.195:8989/api/auth', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();
  //     if (response.ok && data.message === 'Successful') {
  //       let token = data.data.accessToken;
  //       console.log(token);
  //       localStorage.setItem('authToken', data.data.accessToken);
  //       alert('Login successful!');
  //       navigate('/');
  //       console.log(typeof localStorage.getItem('authToken'));
  //       // Redirect or update the UI as needed
  //       let user = data.data;
  //       return user;
  //     } else {
  //       navigate('/auth/welcomeBack');
  //       alert('Unauthorized');
  //       console.log('not authenticated');
  //       // notify2();
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

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
      if (response.ok && data.message === 'Successful') {
        localStorage.setItem('authToken', data.data.accessToken);
        localStorage.setItem('userInfo', data.data);
        alert('Login successful!');
        navigate('/');
        // console.log(typeof localStorage.getItem('authToken'));
        // Redirect or update the UI as needed
        let user = data.data;
        return user;
      } else {
        navigate('/auth/welcomeBack');
        console.log('not authenticated');
        // notify2();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Incorrect Username or Password');
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    navigate('/auth/welcomeback'); // redirect the user to the login page after logging out
    console.log('Logged out');
  };

  // GETTING USERS
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
      // console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // USER ACTIONS
  const setPassword = async (userInfo: { password: string }) => {
    const payload = {
      password: userInfo.password,
    };

    try {
      const response = await fetch(
        'http://185.4.176.195:8989/api/auth/set-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok && data.message === 'Successful') {
        // let token = data.data.accessToken;
        // console.log(token);
        localStorage.setItem('authToken', data.data.accessToken);
        alert('password set successfully!');
        navigate('/');
        // console.log(typeof localStorage.getItem('authToken'));
        // Redirect or update the UI as needed
      } else {
        navigate('/auth/welcomeBack');
        alert('password not set');
        console.log('password not set');
        // notify2();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetPassword = async (userInfo: {
    userId: string;
    password: string;
  }) => {
    const payload = {
      userId: userInfo.userId,
      password: userInfo.password,
    };

    try {
      const response = await fetch(
        'http://185.4.176.195:8989/api/auth/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok && data.message === 'Successful') {
        // let token = data.data.accessToken;
        // console.log(token);
        localStorage.setItem('authToken', data.data.accessToken);
        alert('password has been reset!');
        navigate('/');
        // console.log(typeof localStorage.getItem('authToken'));
        // Redirect or update the UI as needed
      } else {
        navigate('/auth/welcomeBack');
        alert('password not reset');
        console.log('password not reset');
        // notify2();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const changePassword = async (userInfo: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const payload = {
      oldPassword: userInfo.oldPassword,
      newPassword: userInfo.newPassword,
    };

    try {
      const response = await fetch(
        'http://185.4.176.195:8989/api/auth/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.ok && data.message === 'Successful') {
        let token = data.data.accessToken;
        console.log(token);
        localStorage.setItem('authToken', data.data.accessToken);
        alert('password changed successfully!');
        navigate('/');
        console.log(typeof localStorage.getItem('authToken'));
        // Redirect or update the UI as needed
      } else {
        navigate('/auth/welcomeBack');
        alert('password not changed');
        console.log('password not changed');
        // notify2();
      }
    } catch (error) {
      console.error('Error:', error);
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
    data: string;
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

      if (response.ok && data.message === 'User created successfully') {
        alert('User Added successfully');
        console.log(data.message);
        console.log(data.data);
      } else {
        // setError(data.message || 'User not Added');
        console.log('User not Added');
        alert(`User not Added: ${data.message}`);
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

      if (response.ok && data.message === 'Successful') {
        alert('User updated successfully');
        console.log('User updated successfully');
        console.log(data.data);
      } else {
        // setError(data.message || 'User not updated');
        console.log('User not updated');
        alert(data.message);
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/UserManagement');
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
      const data = await response.json();

      if (response.ok && data.message === 'Successful') {
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
    navigate('/UserManagement');
  };

  // BRANCH MANAGEMENT
  const AddNewBranch = async (BranchInfo: {
    // id: string;
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

      if (response.ok && data.message === 'Branch created successfully') {
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

      if (response.ok && data.message === 'Successful') {
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

      const data = await response.json();

      if (response.ok && data.message === 'Successful') {
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

  // TERMINAL MANAGEMENT
  const AddNewTerminal = async (terminalInfo: {
    serialNumber: string;
    imei: string;
    branchId: string;
  }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(terminalInfo);
    try {
      const response = await fetch('http://185.4.176.195:8989/api/terminals/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(terminalInfo),
      });

      const data = await response.json();

      if (response.ok && data.message === 'Successful') {
        alert('Terminal added successfully');
        console.log(data.message);
        console.log(data.data);
      } else {
        // setError(data.message || 'User not Added');
        console.log('Terminal not added');
        alert('Terminal not added');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/TerminalManagement');
  };

  const ActivateTerminal = async (terminalInfo: { serialNumber: string }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(terminalInfo);
    try {
      const response = await fetch(
        'http://185.4.176.195:8989/api/terminals/activation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(terminalInfo),
        },
      );

      const data = await response.json();

      if (response.ok && data.message === 'Successful') {
        alert('Terminal activated successfully');
        console.log(data.message);
        console.log(data.data);
      } else {
        // setError(data.message || 'User not Added');
        console.log('Terminal not activated');
        alert('Terminal not activated');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/TerminalManagement');
  };

  const DeleteTerminal = async (branchId: { branchId: string }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(branchId);
    try {
      const response = await fetch(
        `http://185.4.176.195:8989/api/terminals/${branchId.branchId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.message === 'Successful') {
        alert('Terminal Deleted successfully');
        // console.log(data.message);
        // console.log(data.data);
      } else {
        // setError(data.message || 'User not Added');
        // console.log('Branch not Deleted');
        alert('Terminal not Deleted');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/TerminalManagement');
  };

  // ITEM MANAGEMENT
  const AddNewItem = async (itemInfo: {
    imageKey: string;
    imageUrl: string;
    description: string;
    itemSize: string;
    itemType: string;
    amount: number;
    stock: number;
    branch: number;
  }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(itemInfo);
    try {
      const response = await fetch('http://185.4.176.195:8989/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemInfo),
      });

      const data = await response.json();

      if (response.ok && data.success === true) {
        alert('Item added successfully');
        console.log(data.message);
        console.log(data.data);
      } else {
        // setError(data.message || 'User not Added');
        console.log('Item not added');
        alert('Item not added');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/ItemManagement');
  };

  const AddItemStock = async (stockInfo: {
    itemId: string;
    quantity: number;
  }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(stockInfo);
    try {
      const response = await fetch(
        'http://185.4.176.195:8989/api/terminals/items/stock',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(stockInfo),
        },
      );

      const data = await response.json();

      if (response.ok && data.success === true) {
        alert('stock added successfully');
        console.log(data.message);
        console.log(data.data);
      } else {
        // setError(data.message || 'User not Added');
        console.log('stock not added');
        alert('stock not added');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/ItemManagement');
  };

  const DeleteItem = async (id: { id: string }) => {
    setLoading(true);
    let token = localStorage.getItem('authToken');
    console.log(id);
    try {
      const response = await fetch(
        `http://185.4.176.195:8989/api/items/${id.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.success === 'true') {
        alert('Item Deleted successfully');
      } else {
        // setError(data.message || 'User not Added');
        // console.log('Branch not Deleted');
        alert('Item not Deleted');
      }
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
    navigate('/ItemManagement');
  };

  const contextData: AuthContextValue = {
    user,
    // Authentication
    setPassword,
    resetPassword,
    changePassword,
    handleLogin,
    logoutUser,
    // custom fetch with auth
    fetchWithAuth,
    fetchUsers,
    // user management
    AddNewUser,
    updateUser,
    deleteUser,
    // branch management
    AddNewBranch,
    UpdateBranch,
    DeleteBranch,
    // terminal management
    ActivateTerminal,
    AddNewTerminal,
    DeleteTerminal,
    // item management
    AddNewItem,
    AddItemStock,
    DeleteItem,
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
