import DefaultLayout from '@/layout/DefaultLayout';
import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

export const AddBranch = () => {
  const { AddNewBranch } = useAuth();
  const addBranchRef = React.useRef<HTMLFormElement>(null);
  const [namevalue, setNamevalue] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [branchId, setBranchId] = useState<string>('');
  const [isLoading] = useState<boolean>(false);

  function handleAddBranch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = namevalue as string;
    const address = addBranchRef.current?.address.value;
    // const id = addBranchRef.current?.branchId.value;

    const branchInfo = {
      name,
      address,
      // id,
    };

    AddNewBranch(branchInfo);
    console.log(branchInfo);
  }
  return (
    <DefaultLayout>
      <div className="w-full md:w-[43rem] mx-auto md:px-[3.5rem] py-12 bg-white border-0 text-black">
        <div className="flex-col justify-between items-center">
          {/* <div className="flex justify-center p-[1rem]">
            <img src="/logo.png" alt="" width={30} />
          </div> */}
          <h1 className="text-center text-2xl font-bold mb-[4.5rem] font-lato">
            ADD BRANCH
          </h1>
        </div>
        <form
          id="form"
          noValidate
          ref={addBranchRef}
          onSubmit={handleAddBranch}
        >
          <div className="relative z-0 w-full mb-1">
            <input
              value={namevalue}
              onChange={(e) => setNamevalue(e.target.value)}
              type="text"
              name="name"
              placeholder="Enter Branch Name"
              required
              className="p-[1rem] block w-full mt-0 bg-transparent border-2 h-[3rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="Branch name"
              className="relative duration-300 -top-[4.85rem] -z-1 origin-0 text-gray-500"
            >
              Branch Name
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
              placeholder="Enter Branch Address"
              required
              className="p-[1rem] block w-full mt-0 bg-transparent border-2 h-[3rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="Branch ID"
              className="relative duration-300 -top-[4.85rem] -z-1 origin-0 text-gray-500"
            >
              Branch Address
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Branch Address is required
            </span>
          </div>
          {/* <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
            <input
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              type="text"
              name="branchId"
              placeholder="Enter Branch ID"
              required
              className="p-[1rem] block w-full mt-0 bg-transparent border-2 h-[3rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="Branch ID"
              className="relative duration-300 -top-[4.85rem] -z-1 origin-0 text-gray-500"
            >
              Branch ID
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Branch ID is required
            </span>
          </div> */}

          <div className="flex justify-center mt-2 relative -top-[3rem]">
            <input
              id="button"
              type="submit"
              value={isLoading ? 'Adding branch...' : 'Add Branch'}
              className="mb-[6.5rem] mt-[4.25rem] w-full font-semibold px-6 py-3 text-md transition-all duration-150 ease-linear shadow outline-none bg-basecolor  hover:bg-black text-black hover:text-white hover:shadow-lg focus:outline-none"
            />
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};
