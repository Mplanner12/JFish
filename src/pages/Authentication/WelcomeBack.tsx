import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import NonAuthenticatedLayout from '../../layout/NonAuthenticatedLayout';
import toast, { Toaster } from 'react-hot-toast';

export const WelcomeBack = () => {
  // const notify1 = () => toast('Log in with your details below');
  const notify2 = () => toast("You're not Logged in");
  const loginForm = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { user, handleLogin } = useAuth();
  useEffect(() => {
    if (user) {
      navigate('/');
      console.log(user);
      // notify1();
    }
    navigate('/auth/welcomeBack');
    console.log('not authenticated');
    notify2();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = loginForm.current?.username.value as string;
    const password = loginForm.current?.password.value as string;

    const userInfo = { username, password };
    handleLogin(userInfo);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  return (
    <NonAuthenticatedLayout>
      <div className="w-full h-full bg-white md:bg-basecolor p-[5rem]  flex flex-col md:flex-row justify-between text-black">
        <Toaster />
        <div className="h-full flex flex-col justify-center mx-auto my-auto relative -left-[8rem] -top-[1.5rem]">
          <div>
            <img
              src="/logo.png"
              alt=""
              className="hidden md:block w-[22.5rem] relative -top-[1.75rem]"
            />
            <img
              src="/logoSmall.png"
              alt=""
              className="md:hidden relative top-[5rem] mb-[5.5rem] w-[3.85rem]"
            />
          </div>
          <h1 className="hidden md:block -mt-[1.5rem] font-bold text-6xl text-center relative top-5">
            JTFish
          </h1>
        </div>
        <div className="bg-white md:h-fit relative top-[0.25rem] md:pb-0 sm:p-12">
          <div className="md:w-[28rem] mx-auto py-1 pb-[2.25rem] bg-inherit border-0">
            <h1 className="text-center text-2xl md:text-[2rem] font-[700] mb-[4rem] font-lato">
              WELCOME BACK!
            </h1>
            <form id="form" noValidate ref={loginForm} onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-1">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="abusalmah20@gmail.com"
                  required
                  className="p-[1rem] font-[400] block w-full mt-0 bg-transparent border-2 h-[3.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="name"
                  className="relative duration-300 font-[400] -top-[5.35rem] -z-1 origin-0 text-gray-500"
                >
                  Username
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Name is required
                </span>
              </div>
              <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
                <input
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="p-[1rem] block w-full font-[400] mt-0 bg-transparent border-2 h-[3.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="name"
                  className="relative duration-300 font-[400] -top-[5.35rem] -z-1 origin-0 text-gray-500"
                >
                  Password
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Name is required
                </span>
              </div>
              {/* <fieldset className="relative -top-7 z-0 w-full p-px mb-5">
                <div className="block pt-3 pb-2 space-x-12">
                  <label>
                    <input
                      type="radio"
                      name="radio"
                      value="1"
                      placeholder=""
                      className="mr-2 text-basecolor border-2 placeholder-current outline-basecolor accent-basecolor focus:ring-basecolor"
                    />
                    Admin
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="radio"
                      value="1"
                      placeholder=""
                      className="mr-2 text-basecolor border-2 placeholder-current outline-basecolor accent-basecolor focus:ring-basecolor"
                    />
                    User
                  </label>
                </div>
                <span className="text-sm text-red-600 hidden" id="error">
                  Option has to be selected
                </span>
              </fieldset> */}
              <a href="">
                <p className="flex justify-end font-[400] text-lg relative -top-5 md:top-[1rem] mb-[1.5rem] md:mb-[2.5rem]">
                  Forgot password ?
                </p>
              </a>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Login"
                  className="h-[3.5rem] font-[700] hover:bg-black hover:text-white mb-[5.5rem] md:-mb-[2rem] w-full px-6 py-3 text-md transition-all duration-150 ease-linear shadow outline-none bg-basecolor hover:shadow-lg focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </NonAuthenticatedLayout>
  );
};
