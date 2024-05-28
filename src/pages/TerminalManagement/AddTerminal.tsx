import DefaultLayout from '@/layout/DefaultLayout';
import { useRef, useState } from 'react';
import { useAuth } from '../utils/AuthContext';

export const AddTerminal = () => {
  const AddTerminalRef = useRef<HTMLFormElement>(null);
  const [serialNo, setSerialNo] = useState<string>('');
  const [imei, setImei] = useState<string>('');
  const [branchId, setBranchId] = useState<string>('');
  const { AddNewTerminal } = useAuth();
  const [isLoading] = useState<boolean>(false);

  const handleAddTerminal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serialNumber = AddTerminalRef.current?.serialNo.value as string;
    const imei = AddTerminalRef.current?.imei.value as string;
    const branchId = AddTerminalRef.current?.branchId.value as string;

    const termianlInfo = { serialNumber, imei, branchId };
    console.log(termianlInfo);

    AddNewTerminal(termianlInfo);
  };

  return (
    <DefaultLayout>
      <div className="w-full md:w-[43rem] mx-auto px-[1rem] md:px-[3.5rem] py-12 bg-white border-0 text-black">
        <div className="flex-col justify-between items-center">
          {/* <div className="flex justify-center p-[1rem]">
            <img src="/logo.png" alt="" width={30} />
          </div> */}
          <h1 className="text-center text-2xl font-bold mb-[5rem] font-lato">
            ADD TERMINAL
          </h1>
        </div>
        <form
          id="form"
          noValidate
          ref={AddTerminalRef}
          onSubmit={handleAddTerminal}
        >
          <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
            <input
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              type="number"
              name="serialNo"
              placeholder="Enter Serial number"
              required
              className="p-[1rem] block w-full mt-0 bg-transparent border-2 h-[3.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="serial-no"
              className="relative duration-300 -top-[5.25rem] -z-1 origin-0 text-gray-500"
            >
              Serial number
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Serial number is required
            </span>
          </div>
          <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
            <input
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              type="number"
              name="imei"
              placeholder="Enter IMei"
              required
              className="p-[1rem] block w-full mt-0 bg-transparent border-2 h-[3.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="imei"
              className="relative duration-300 -top-[5.25rem] -z-1 origin-0 text-gray-500"
            >
              IMei
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              IMei number is required
            </span>
          </div>
          <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
            <input
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              type="string"
              name="branchId"
              placeholder="Enter Branch ID"
              required
              className="p-[1rem] block w-full mt-0 bg-transparent border-2 h-[3.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="branchId"
              className="relative duration-300 -top-[5.25rem] -z-1 origin-0 text-gray-500"
            >
              Branch ID
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Branch ID is required
            </span>
          </div>

          <div className="flex justify-center mt-2 relative -top-[3rem]">
            <input
              id="button"
              type="submit"
              value={isLoading ? 'Adding Terminal...' : 'Add Terminal'}
              className="mb-[6.5rem] mt-[4.25rem] w-full font-semibold px-6 py-3 text-md transition-all duration-150 ease-linear shadow outline-none bg-basecolor  hover:bg-black text-black hover:text-white hover:shadow-lg focus:outline-none"
            />
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};
