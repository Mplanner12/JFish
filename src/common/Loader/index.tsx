import { FishIcon } from 'lucide-react';
import { useAuth } from '@/pages/utils/AuthContext';

const Loader = () => {
  const { user } = useAuth();

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex h-screen items-center justify-center text-basecolor">
        <div className="h-16 w-16 animate-spin rounded-full border-solid border-basecolor border-t-transparent">
          <FishIcon className="h-16 w-16" />
        </div>
        <h1 className="ml-4 text-2xl font-bold ">JFish Loading</h1>
      </div>
      <h1>
        {user ? (
          <p className="text-2xl text-basecolor font-bold relative -top-[14.5rem] text-center">
            Welcome back {user.name}
          </p>
        ) : (
          <p>''</p>
        )}
      </h1>
    </section>
  );
};

export default Loader;
