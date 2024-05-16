import React from 'react';
// import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import NonAuthenticatedLayout from '../../layout/NonAuthenticatedLayout';
import toast, { Toaster } from 'react-hot-toast';

export const WelcomeBack = () => {
  // const notify1 = () => toast('Log in with your details below');
  const notify2 = () => toast("You're not Logged in");
  const loginForm = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
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
    const email = loginForm.current?.email.value as string;
    const password = loginForm.current?.password.value as string;

    const userInfo = { email, password };
    loginUser(userInfo);
  };

  return (
    <NonAuthenticatedLayout>
      <div className="h-full bg-basecolor flex justify-between text-black">
        <Toaster />
        <div className="mx-auto my-auto relative -top-[3rem]">
          <img src="/logo.png" alt="" />
        </div>
        <div className="relative -top-[3rem] p-0 sm:p-12">
          <div className="w-[43rem] mx-auto px-[3.5rem] py-12 bg-white border-0 shadow-lg">
            <h1 className="text-center text-2xl font-bold mb-[3.5rem] font-sans">
              WELCOME BACK!
            </h1>
            <form id="form" noValidate ref={loginForm} onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-1">
                <input
                  type="text"
                  name="email"
                  placeholder="abusalmah20@gmail.com"
                  required
                  className="p-[1rem] rounded-2xl block w-full mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="name"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
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
                  placeholder="Enter password"
                  required
                  className="rounded-2xl p-[1rem] block w-full mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="name"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Password
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Name is required
                </span>
              </div>
              <div className="w-fit relative -top-6 left-[27rem]">
                <p>Forget password?</p>
              </div>

              <fieldset className="relative -top-7 z-0 w-full p-px mb-5">
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
              </fieldset>
              <div className="mb-5">
                <input
                  type="submit"
                  value="Login"
                  className="hover:bg-black mb-[5.5rem] w-full px-6 py-3 text-md transition-all duration-150 ease-linear rounded-3xl shadow outline-none bg-basecolor hover:shadow-lg focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </NonAuthenticatedLayout>
  );
};
