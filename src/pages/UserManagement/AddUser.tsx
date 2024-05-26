import DefaultLayout from '@/layout/DefaultLayout';
import { useState, useRef } from 'react';
import { useAuth } from '../utils/AuthContext';

export const AddUser = () => {
  const AddUserForm = useRef<HTMLFormElement>(null);
  const [idvalue, setIdvalue] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [middlename, setMiddlename] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [rolevalue, setRolevalue] = useState<string>('');
  const [branchId, setBranchId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error] = useState<string | null>(null);
  const [isLoading] = useState<boolean>(false);

  const { AddNewUser } = useAuth();

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('button clicked');
    e.preventDefault();

    const id = idvalue as string;
    const firstname = AddUserForm.current?.firstname.value as string;
    const middlename = AddUserForm.current?.middlename.value as string;
    const lastname = AddUserForm.current?.lastname.value as string;
    const phone = AddUserForm.current?.phone.value as string;
    const email = AddUserForm.current?.email.value as string;
    const role = rolevalue as string;
    const branchId = AddUserForm.current?.branchId.value as string;
    const password = AddUserForm.current?.password.value as string;

    const userInfo = {
      id,
      firstname,
      middlename,
      lastname,
      phone,
      email,
      role,
      branchId,
      password,
    };

    AddNewUser(userInfo);
  };

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    let selectvalue = e.target.value;
    console.log(selectvalue);
    setRolevalue((_rolevalue) => selectvalue);
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

          <form id="form" noValidate onSubmit={handleAddUser} ref={AddUserForm}>
            <div className="">
              <div className="relative z-0 w-full mb-1">
                <input
                  value={idvalue}
                  onChange={(e) => setIdvalue(e.target.value)}
                  type="text"
                  name="id"
                  placeholder="98fa79-k8h1-252u-0252-r5817936858"
                  required
                  className="p-[1rem] w-full block  mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="id"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  ID
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  ID is required
                </span>
              </div>
              <div className="relative z-0 w-full mb-1 mt-6">
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Enter First Name"
                  required
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
              <div className="relative z-0 w-full mt-6 mb-1">
                <input
                  type="text"
                  name="middlename"
                  value={middlename}
                  onChange={(e) => setMiddlename(e.target.value)}
                  placeholder="Enter MIddle Name"
                  required
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
              <div className="relative mt-6 -top-2  z-0 w-full mb-1">
                <input
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone Number"
                  required
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
              <div className="relative mt-6 mb-1 -top-2 z-0 w-[23rem]">
                <select
                  name="role"
                  value={rolevalue}
                  onChange={handleRoleChange}
                  required
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
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter Last Name"
                  required
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
              <div className="relative z-0 w-full mt-6 mb-1">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
              <div className="relative mt-6 -top-2 z-0 w-full mb-1">
                <input
                  type="text"
                  name="branchId"
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  placeholder="Enter Branch ID"
                  required
                  className="uppercase p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
              <div className="relative mt-6 -top-2 z-0 w-full mb-1">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                  className="p-[1rem] w-full block md:w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                <label
                  htmlFor="password"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Enter Password
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Password is required
                </span>
              </div>
            </div>
            <div className="flex justify-center mt-2 relative -top-[3rem]">
              <input
                id="button"
                type="submit"
                value={isLoading ? 'Adding User...' : 'Add User'}
                className="mb-[6.5rem] mt-[4.25rem] w-full font-semibold px-6 py-3 text-md transition-all duration-150 ease-linear shadow outline-none bg-basecolor  hover:bg-black text-black hover:text-white hover:shadow-lg focus:outline-none"
              />
            </div>
            {error && (
              <p className="text-red-500 font-bold relative -top-5">{error}</p>
            )}
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};
