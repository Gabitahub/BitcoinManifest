import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="top-0 sticky h-screen w-screen bg-opacity-30 bg-gray-600 flex items-center justify-center z-[100]">
      <div className="animate-spin">
        <Loader />
      </div>
    </div>
  );
};

export default LoadingPage;
