import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import NotFoundPage from './components/Notfoundpage';
import UserManagement from './pages/UserManagement/UserManagement';
import { OrderManagement } from './pages/OrderManagement';
import ItemManagement from './pages/ItemManagement/ItemManagement';
import BranchManagement from './pages/BranchManagement/BranchManagement';
import TerminalManagement from './pages/TerminalManagement/TerminalManagement';
import ProfileSettings from './pages/ProfileSettings/ProfileSettings';
import { WelcomeBack } from './pages/Authentication/WelcomeBack';
import { AddUser } from './pages/UserManagement/AddUser';
import { UpdateUser } from './pages/UserManagement/UpdateUser';
import { UpdateBranch } from './pages/BranchManagement/UpdateBranch';
import { AddBranch } from './pages/BranchManagement/AddBranch';
import { ActivateTerminal } from './pages/TerminalManagement/ActivateTerminal';
import { SetPassword } from './pages/ProfileSettings/SetPassword';
import { ResetPassword } from './pages/ProfileSettings/ResetPassword';
import { ChangePassword } from './pages/ProfileSettings/ChangePassword';
import { AddStock } from './pages/ItemManagement/AddStock';

function App() {
  // const [backendData, setBackendData] = useState<any>([{}]);

  // useEffect(() => {
  //   const response = fetch('/api');
  //   const data = response.then((response) => response.json());
  //   setBackendData({ data });
  // }, []);
  // console.log(backendData);

  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  // Scroll to top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Simulate loading time and set loading state to false after 1 second
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Routes for different components */}
        <Route
          path="/ItemManagement"
          element={
            <>
              <PageTitle title="Item Management | JFish APP" />
              <ItemManagement />
            </>
          }
        />
        <Route
          path="/ItemManagement/addstock"
          element={
            <>
              <PageTitle title="Add Stock | JFish APP" />
              <AddStock />
            </>
          }
        />
        <Route
          path="/UserManagement"
          element={
            <>
              <PageTitle title="User Management | JFish APP" />
              <UserManagement />
            </>
          }
        />
        <Route
          path="/UserManagement/adduser"
          element={
            <>
              <PageTitle title="Welcome Back | JFish APP" />
              <AddUser />
            </>
          }
        />
        <Route
          path="/UserManagement/updateuser"
          element={
            <>
              <PageTitle title="Welcome Back | JFish APP" />
              <UpdateUser />
            </>
          }
        />
        <Route
          index
          // path="/OrderManagement"
          element={
            <>
              <PageTitle title="Order Management | JFish APP" />
              <OrderManagement />
            </>
          }
        />
        <Route
          path="/BranchManagement"
          element={
            <>
              <PageTitle title="Branch Management | JFish APP" />
              <BranchManagement />
            </>
          }
        />
        <Route
          path="/BranchManagement/addbranch"
          element={
            <>
              <PageTitle title="Update Branch | JFish APP" />
              <AddBranch />
            </>
          }
        />
        <Route
          path="/BranchManagement/updatebranch"
          element={
            <>
              <PageTitle title="Branch Management | JFish APP" />
              <UpdateBranch />
            </>
          }
        />
        <Route
          path="/TerminalManagement"
          element={
            <>
              <PageTitle title="Terminal Management | JFish APP" />
              <TerminalManagement />
            </>
          }
        />
        <Route
          path="/TerminalManagement/activateterminal"
          element={
            <>
              <PageTitle title="Activate Terminal | JFish APP" />
              <ActivateTerminal />
            </>
          }
        />
        <Route
          path="/ProfileSettings"
          element={
            <>
              <PageTitle title="Profile Settings | JFish APP" />
              <ProfileSettings />
            </>
          }
        />
        {/* <Route
          path="/ProfileSettings/updateprofile"
          element={
            <>
              <PageTitle title="Update Profile | JFish APP" />
              <ProfileSettings />
            </>
          }
        /> */}
        <Route
          path="/ProfileSettings/changepassword"
          element={
            <>
              <PageTitle title="Change Password | JFish APP" />
              <ChangePassword />
            </>
          }
        />
        <Route
          path="/ProfileSettings/setpassword"
          element={
            <>
              <PageTitle title="Set Password | JFish APP" />
              <SetPassword />
            </>
          }
        />
        <Route
          path="/ProfileSettings/resetpassword"
          element={
            <>
              <PageTitle title="Reset Password | JFish APP" />
              <ResetPassword />
            </>
          }
        />
        {/* <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | JFish APP" />
              <SignIn />
            </>
          }
        /> */}
        <Route
          path="/auth/welcomeBack"
          element={
            <>
              <PageTitle title="Welcome Back | JFish APP" />
              <WelcomeBack />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | JFish APP" />
              <SignUp />
            </>
          }
        />
        {/* 404 Route */}
        <Route
          path="*"
          element={
            <>
              <PageTitle title="404 | JFish APP" />
              <NotFoundPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
