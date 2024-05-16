import DefaultLayout from '@/layout/DefaultLayout';

export const AddUser = () => {
  return (
    <>
      <DefaultLayout>
        <div className="w-[55rem] h-fit mx-auto px-[3.5rem] py-12 bg-white border-0">
          <div className="flex-col justify-between items-center">
            <div className="flex justify-center p-[1rem]">
              <img src="/logo.png" alt="" width={30} />
            </div>
            <h1 className="text-center text-2xl text-black font-bold mb-[3.5rem] font-sans">
              Add User
            </h1>
          </div>

          <form id="form" noValidate>
            <div className="flex justify-center ">
              <div className="w-fit px-[1.5rem]">
                <div className="relative z-0 w-full mb-1">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Enter First Name"
                    required
                    className="p-[1rem] rounded-2xl block w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
                    type="text"
                    name="middlename"
                    placeholder="Enter MIddle Name"
                    required
                    className="p-[1rem] rounded-2xl block w-[23rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
                    type="number"
                    name="phone"
                    placeholder="Enter Phone Number"
                    required
                    className="p-[1rem] rounded-2xl block w-full mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
                <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
                  <select
                    name="role"
                    required
                    className="block appearance-none w-full border border-basecolor hover:border-gray-500 px-4 py-2 pr-8 rounded-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option className="p-[1.5rem] border-basecolor border-2">
                      Admin
                    </option>
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
              <div className="w-fit px-[1.5rem]">
                <div className="relative z-0 w-full mb-1">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Enter Last Name"
                    required
                    className="p-[1rem] rounded-2xl block w-[22rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                    className="p-[1rem] rounded-2xl block w-[22rem] mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
                    type="text"
                    name="branchid"
                    placeholder="Enter Branch ID"
                    required
                    className="p-[1rem] rounded-2xl block w-full mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
                <div className="relative mt-[3rem] -top-2  z-0 w-full mb-1">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    required
                    className="p-[1rem] rounded-2xl block w-full mt-0 bg-transparent border-2 h-[2.5rem] focus:outline-none focus:ring-0 focus:border-black border-basecolor"
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
            </div>
            <div className="flex justify-center relative -top-[3rem]">
              <button
                id="button"
                type="button"
                className="mb-[6.5rem] mt-[4.25rem] w-[65%] text-black font-semibold px-6 py-3 text-md transition-all duration-150 ease-linear rounded-3xl shadow outline-none bg-basecolor hover:bg-black hover:text-white hover:shadow-lg focus:outline-none"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};
