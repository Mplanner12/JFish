import DefaultLayout from '@/layout/DefaultLayout';
import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

export const UpdateBranch = () => {
  const { UpdateBranch } = useAuth();
  const updateBranchRef = React.useRef<HTMLFormElement>(null);
  const [namevalue, setNamevalue] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [idvalue, setIdvalue] = useState<string>('');
  const [isLoading] = useState(false);

  function handleUpdateBranch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = namevalue as string;
    const address = updateBranchRef.current?.address.value;
    const id = idvalue as string;

    const branchInfo = {
      id,
      name,
      address,
    };

    UpdateBranch(branchInfo);
  }

  return (
    <DefaultLayout>
      <div className="w-full md:w-[43rem] mx-auto md:px-[3.5rem] py-12 bg-white border-0 text-black">
        <div className="flex-col justify-between items-center">
          <h1 className="text-center text-2xl font-bold mb-[3.5rem] font-lato">
            UPDATE BRANCH
          </h1>
        </div>
        <form
          id="form"
          noValidate
          ref={updateBranchRef}
          onSubmit={handleUpdateBranch}
        >
          <div className="relative z-0 w-full mb-1">
            <input
              value={idvalue}
              onChange={(e) => setIdvalue(e.target.value)}
              type="text"
              name="id"
              placeholder="54678-6487-abc4-46JTF"
              required
              className="p-[1rem] block w-full mt-0 bg-transparent border-2 h-[3.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="id"
              className="relative duration-300 -top-[5rem] -z-1 origin-0 text-gray-500"
            >
              ID
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              ID is required
            </span>
          </div>
          <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
            <input
              value={namevalue}
              onChange={(e) => setNamevalue(e.target.value)}
              type="text"
              name="name"
              placeholder="Kubwa"
              required
              className="p-[1rem] block w-full mt-0 bg-transparent border-2 h-[3.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="name"
              className="relative duration-300 -top-[5rem] -z-1 origin-0 text-gray-500"
            >
              Name
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Name is required
            </span>
          </div>
          <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="address"
              placeholder="kubwa"
              required
              className="p-[1rem] block w-full mt-0 bg-transparent border-2 h-[3.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="Branch addres"
              className="relative duration-300 -top-[5rem] -z-1 origin-0 text-gray-500"
            >
              Branch Address
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Branch Address is required
            </span>
          </div>

          <div className="flex justify-center mt-2 relative -top-[3rem]">
            <input
              id="button"
              type="submit"
              value={isLoading ? 'Updating branch...' : 'Update Branch'}
              className="mb-[6.5rem] mt-[4.25rem] w-full font-semibold px-6 py-3 text-md transition-all duration-150 ease-linear shadow outline-none bg-basecolor  hover:bg-black text-black hover:text-white hover:shadow-lg focus:outline-none"
            />
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};
