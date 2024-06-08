import DefaultLayout from '@/layout/DefaultLayout';
import { useRef } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useForm } from 'react-hook-form';

export const AddUser = () => {
  const { AddNewUser } = useAuth();

  const AddUserForm = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(data: any) {
    AddNewUser(data);
    console.log(data);
    reset();
  }

  return (
    <>
      <DefaultLayout>
        <div className="w-full flex flex-col justify-center items-center md:w-[50rem] h-fit mx-auto px-[1rem] md:px-[2.5rem] text-black py-12 pt-2 bg-white border-0">
          <div className="flex-col justify-between items-center">
            {/* <div className="flex justify-center p-[1rem]">
              <img src="/logo.png" alt="" width={30} />
            </div> */}
            <h1 className="text-center text-2xl text-black font-bold mb-[3.5rem] font-lato">
              ADD USER
            </h1>
          </div>

          <form
            id="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            ref={AddUserForm}
            className="flex flex-col justify-center items-center"
          >
            <div className="md:w-[23rem]">
              <div className="relative z-0 w-full mb-1 mt-6">
                <input
                  {...register('firstname', {
                    required: 'First Name is required',
                  })}
                  type="text"
                  name="firstname"
                  placeholder="Enter First Name"
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.firstname && (
                  <p className="text-red-500 -mb-3">{`${errors.firstname.message}`}</p>
                )}
                <label
                  htmlFor="firstname"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  First Name
                </label>
              </div>
              <div className="relative z-0 w-full mt-6 mb-1">
                <input
                  {...register('middlename', {
                    required: 'Middle Name is required',
                  })}
                  type="text"
                  name="middlename"
                  placeholder="Enter MIddle Name"
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.middlename && (
                  <p className="text-red-500 -mb-3">{`${errors.middlename.message}`}</p>
                )}
                <label
                  htmlFor="middlename"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Middle Name
                </label>
              </div>
              <div className="relative mt-6 -top-2  z-0 w-full mb-1">
                <input
                  {...register('phone', {
                    required: 'Phone Number is required',
                  })}
                  type="number"
                  name="phone"
                  placeholder="Enter Phone Number"
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.phone && (
                  <p className="text-red-500 -mb-3">{`${errors.phone.message}`}</p>
                )}
                <label
                  htmlFor="phone"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Phone Number
                </label>
              </div>
              <div className="relative mt-6 mb-1 -top-2 z-0 w-[23rem]">
                <select
                  {...register('role', { required: 'Role is required' })}
                  name="role"
                  className="block appearance-none w-full border-2 border-basecolor hover:border-gray-500 px-4 py-2 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value={''} disabled hidden>
                    Choose here
                  </option>
                  <option
                    className="w-[12rem] p-[1.5rem] border-basecolor border-2"
                    value={'ADMIN'}
                  >
                    ADMIN
                  </option>
                  <option className="w-[12rem]" value={'USER'}>
                    USER
                  </option>
                </select>
                {errors.role && (
                  <p className="text-red-500 -mb-3">{`${errors.role.message}`}</p>
                )}
                <label
                  htmlFor="role"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Role
                </label>
                <div className="pointer-events-none absolute -top-4 inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.95 7.95l-3.95 3.95l-3.95-3.95l-.7.7l4.65 4.65l4.65-4.65l-.7-.7z" />
                  </svg>
                </div>
                <span className="text-sm text-red-600 hidden" id="error">
                  Role is required
                </span>
              </div>
              <div className="relative z-0 w-full mt-3 mb-1">
                <input
                  {...register('lastname', {
                    required: 'Last Name is required',
                  })}
                  type="text"
                  name="lastname"
                  placeholder="Enter Last Name"
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.lastname && (
                  <p className="text-red-500 -mb-3">{`${errors.lastname.message}`}</p>
                )}
                <label
                  htmlFor="lastname"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Last Name
                </label>
              </div>
              <div className="relative z-0 w-full mt-6 mb-1">
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.email && (
                  <p className="text-red-500 -mb-3">{`${errors.email.message}`}</p>
                )}
                <label
                  htmlFor="email"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Email
                </label>
              </div>
              <div className="relative mt-6 -top-2 z-0 w-full mb-1">
                <input
                  {...register('branchId', {
                    required: 'Branch ID is required',
                  })}
                  type="text"
                  name="branchId"
                  placeholder="Enter Branch ID"
                  className="uppercase p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.branchId && (
                  <p className="text-red-500 -mb-3">{`${errors.branchId.message}`}</p>
                )}
                <label
                  htmlFor="branchid"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Branch ID
                </label>
              </div>
              <div className="relative mt-6 -top-2 z-0 w-full mb-1">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 5,
                      message: 'Password must be at least 5 characters long',
                    },
                  })}
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="password"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Enter Password
                </label>
              </div>
            </div>
            <div className="md:w-[23rem] flex justify-center mt-2 relative -top-[3rem]">
              <input
                disabled={isSubmitting}
                id="button"
                type="submit"
                className="mb-[6.5rem] disabled:bg-slate-700 mt-[4.25rem] w-full font-semibold px-6 py-3 text-md transition-all duration-150 ease-linear shadow outline-none bg-basecolor  hover:bg-black text-black hover:text-white hover:shadow-lg focus:outline-none"
              />
            </div>
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};
