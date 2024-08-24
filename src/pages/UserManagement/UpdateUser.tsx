import DefaultLayout from '@/layout/DefaultLayout';
import { useAuth } from '../utils/AuthContext';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const UpdateUser = () => {
  const { fetchWithAuth } = useAuth();

  const [loading, setLoading] = useState(false);
  // const [userId, setUserId] = useState('');
  const [firstname, setFirstName] = useState('');
  const [middlename, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [branchId, setBranchId] = useState('');

  const [data, setData] = useState('');

  const { id } = useParams();

  async function fetchUser() {
    try {
      const response = await fetchWithAuth(
        `http://185.4.176.195:8989/api/users/profile/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const rawdata = await response.json();
      setData(rawdata.data);
      // setUserId(rawdata.data.id);
      setFirstName(rawdata.data.firstname);
      setMiddleName(rawdata.data.middlename);
      setLastName(rawdata.data.lastname);
      setPhone(rawdata.data.phone);
      setRole(rawdata.data.role);
      setEmail(rawdata.data.email);
      setBranchId(rawdata.data.branch);
      console.log(data);
    } catch (error) {
      // setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  const { updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(data: any) {
    updateUser(data);
    console.log(data);
    reset();
  }

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
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full md:px-[1.5rem]">
              {/* <div className="relative z-0 w-full mb-1">
                <input
                  {...register('id', {
                    required: 'ID is required',
                  })}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  name="id"
                  type="text"
                  placeholder="98fa79-k8h1-252u-0252-r5817936858"
                  required
                  className="p-[1rem] w-full block  mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.id && (
                  <p className="text-red-500 text-sm">{`${errors.id.message}`}</p>
                )}
                <label
                  htmlFor="id"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  ID
                </label>
              </div> */}
              <div className="relative z-0 w-full mt-6 mb-1">
                <input
                  {...register('firstname', {
                    required: 'First Name is required',
                  })}
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  name="firstname"
                  placeholder="Adams"
                  required
                  className="p-[1rem] w-full block  mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{`${errors.firstname.message}`}</p>
                )}
                <label
                  htmlFor="firstname"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  First Name
                </label>
              </div>
              <div className="relative z-0 w-full mt-6">
                <input
                  {...register('middlename', {
                    required: 'Middle Name is required',
                  })}
                  value={middlename}
                  onChange={(e) => setMiddleName(e.target.value)}
                  type="text"
                  name="middlename"
                  placeholder="Hassan"
                  required
                  className="p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.middlename && (
                  <p className="text-red-500 text-sm">{`${errors.middlename.message}`}</p>
                )}
                <label
                  htmlFor="middlename"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Middle Name
                </label>
              </div>
              <div className="relative mt-[2.25rem] -top-2  z-0 w-full mb-1">
                <input
                  {...register('phone', {
                    required: 'Phone Number is required',
                  })}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  name="phone"
                  placeholder="09030445778"
                  required
                  className="p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{`${errors.phone.message}`}</p>
                )}
                <label
                  htmlFor="phone"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Phone Number
                </label>
              </div>
              <div className="relative mt-[2.25rem] -top-[1.5rem]  z-0 w-full mb-1">
                <select
                  {...register('role', {
                    required: 'Role is required',
                  })}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  name="role"
                  className="block appearance-none w-full h-[2.5rem] border-basecolor border-2 hover:border-gray-500 px-4 py-2 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value={''} disabled hidden>
                    Choose here
                  </option>
                  <option>ADMIN</option>
                  <option>USERS</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{`${errors.role.message}`}</p>
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
              </div>
            </div>
            <div className="w-full md:px-[1.5rem]">
              <div className="relative z-0 w-full mb-1">
                <input
                  {...register('lastname', {
                    required: 'Last Name is required',
                  })}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  name="lastname"
                  placeholder="Taiwo"
                  className="p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{`${errors.lastname.message}`}</p>
                )}
                <label
                  htmlFor="lastname"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Last Name
                </label>
              </div>
              <div className="relative z-0 w-full mt-6">
                <input
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="ad@jtf.com"
                  required
                  className="p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
                )}
                <label
                  htmlFor="email"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Email
                </label>
              </div>
              <div className="relative mt-[2.25rem] -top-2  z-0 w-full mb-1">
                <input
                  {...register('branchId', {
                    required: 'Branch ID is required',
                  })}
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  type="text"
                  name="branchId"
                  placeholder="kubwa_branch"
                  required
                  className="uppercase p-[1rem] w-full block mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
                />
                {errors.branchId && (
                  <p className="text-red-500 text-sm">{`${errors.branchId.message}`}</p>
                )}
                <label
                  htmlFor="branchId"
                  className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
                >
                  Branch ID
                </label>
              </div>
            </div>
            <div className="flex justify-center relative -top-[3rem]">
              <input
                id="button"
                type="submit"
                value={isSubmitting ? 'Updating...' : 'Update'}
                className="mb-[6.5rem] mt-[4.25rem] w-full md:w-[90%] font-semibold px-6 py-3 text-md transition-all duration-150 ease-linear shadow outline-none bg-basecolor  hover:bg-black text-black hover:text-white hover:shadow-lg focus:outline-none"
              />
            </div>
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};
