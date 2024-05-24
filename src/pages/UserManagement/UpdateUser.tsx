import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useRef } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

export const UpdateUser = () => {
  const navigate = useNavigate();
  const updateUserForm = useRef<HTMLFormElement>(null);
  const [firstname, setFirstname] = useState<string>('');
  const [middlename, setMiddlename] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [rolevalue, setRolevalue] = useState<string>('');
  const [branchId, setBranchId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { updateUser } = useAuth();

  // const updateUser = async (userInfo: {
  //   firstname: string;
  //   middlename: string;
  //   lastname: string;
  //   phone: string;
  //   email: string;
  //   role: string;
  //   branchId: string;
  // }) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await UpdateNewUser(
  //       'http://185.4.176.195:8989/api/users',
  //       {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(userInfo),
  //       },
  //     );

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert('User updated successfully');
  //       console.log('User updated successfully');
  //       console.log(data.data);
  //       navigate('/UserManagement');
  //     } else {
  //       setError(data.message || 'User not updated');
  //       console.log('User not updated');
  //     }
  //   } catch (error) {
  //     setError('An error occurred. Please try again.');
  //     console.error('Error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleUserUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('button clicked');
    e.preventDefault();

    const firstname = updateUserForm.current?.firstname.value as string;
    const middlename = updateUserForm.current?.middlename.value as string;
    const lastname = updateUserForm.current?.lastname.value as string;
    const phone = updateUserForm.current?.phone.value as string;
    const email = updateUserForm.current?.email.value as string;
    const role = rolevalue as string;
    const branchId = updateUserForm.current?.branchId.value as string;

    const userInfo = {
      firstname,
      middlename,
      lastname,
      phone,
      email,
      role,
      branchId,
    };

    updateUser(userInfo);
  };

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col justify-center md:w-[32rem] h-fit mx-auto px-[1.5rem] md:px-[2.5rem] text-black py-12 bg-white border-0">
          <div className="flex-col justify-between items-center">
            <h1 className="text-center text-2xl text-black font-bold mb-[3.5rem] font-lato">
              UPDATE USER
            </h1>
          </div>

          <form
            id="form"
            noValidate
            className="flex flex-col justify-center"
            ref={updateUserForm}
            onSubmit={handleUserUpdate}
          >
            <div className="w-full md:px-[1.5rem]">
              <div className="relative z-0 w-full mb-1">
                <input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  name="firstname"
                  placeholder="Adams"
                  required
                  className="p-[1rem] w-full block  mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="firstname"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  First Name
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  First Name is required
                </span>
              </div>
              <div className="relative z-0 w-full mt-10">
                <input
                  value={middlename}
                  onChange={(e) => setMiddlename(e.target.value)}
                  type="text"
                  name="middlename"
                  placeholder="Hassan"
                  required
                  className="p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="middlename"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Middle Name
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Middle Name is required
                </span>
              </div>
              <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  name="phone"
                  placeholder="09030445778"
                  required
                  className="p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="phone"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Phone Number
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Phone Number is required
                </span>
              </div>
              <div className="relative mt-[3rem] -top-[1.5rem]  z-0 w-full mb-1">
                <select
                  name="role"
                  value={rolevalue}
                  onChange={(e) => setRolevalue(e.target.value)}
                  required
                  className="block appearance-none w-full h-[2.5rem] border-basecolor border-2 hover:border-gray-500 px-4 py-2 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option>Admin</option>
                  <option>User</option>
                </select>
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
            </div>
            <div className="w-full md:px-[1.5rem]">
              <div className="relative z-0 w-full mb-1">
                <input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  name="lastname"
                  placeholder="Taiwo"
                  required
                  className="p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="lastname"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Last Name
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Last Name is required
                </span>
              </div>
              <div className="relative z-0 w-full mt-10">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="ad@jtf.com"
                  required
                  className="p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="email"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Email
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Email is required
                </span>
              </div>
              <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
                <input
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  type="text"
                  name="branchId"
                  placeholder="45367252hf"
                  required
                  className="p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="branchid"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Branch ID
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Branch ID is required
                </span>
              </div>
            </div>
            <div className="flex justify-center relative -top-[3rem]">
              <input
                id="button"
                type="submit"
                value={isLoading ? 'Updating...' : 'Update'}
                className="mb-[6.5rem] mt-[4.25rem] w-full md:w-[90%] font-semibold px-6 py-3 text-md transition-all duration-150 ease-linear shadow outline-none bg-basecolor  hover:bg-black text-black hover:text-white hover:shadow-lg focus:outline-none"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};
