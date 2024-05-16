import DefaultLayout from '@/layout/DefaultLayout';

export const AddBranch = () => {
  return (
    <DefaultLayout>
      <div className="w-[43rem] mx-auto px-[3.5rem] py-12 bg-white border-0 text-black">
        <div className="flex-col justify-between items-center">
          <div className="flex justify-center p-[1rem]">
            <img src="/logo.png" alt="" width={30} />
          </div>
          <h1 className="text-center text-2xl font-bold mb-[3.5rem] font-sans">
            Add Branch
          </h1>
        </div>
        <form id="form" noValidate>
          <div className="relative z-0 w-full mb-1">
            <input
              type="text"
              name="name"
              placeholder="Enter Branch Name"
              required
              className="p-[1rem] rounded-2xl block w-full mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="Branch name"
              className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
            >
              Branch Name
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Name is required
            </span>
          </div>
          <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
            <input
              type="text"
              name="name"
              placeholder="Enter Branch Address"
              required
              className="p-[1rem] rounded-2xl block w-full mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="Branch ID"
              className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
            >
              Branch Address
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Branch Address is required
            </span>
          </div>
          <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
            <input
              type="text"
              name="Branch ID"
              placeholder="Enter Branch ID"
              required
              className="p-[1rem] rounded-2xl block w-full mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
            />
            <label
              htmlFor="Branch ID"
              className="relative duration-300 -top-[4.35rem] -z-1 origin-0 text-gray-500"
            >
              Branch ID
            </label>
            <span className="text-sm text-red-600 hidden" id="error">
              Branch ID is required
            </span>
          </div>

          <button
            id="button"
            type="button"
            className="mb-[6.5rem] mt-[4.25rem] w-full font-semibold px-6 py-3 text-md transition-all duration-150 ease-linear rounded-3xl shadow outline-none bg-basecolor hover:bg-black hover:text-white hover:shadow-lg focus:outline-none"
          >
            Add Branch
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};
