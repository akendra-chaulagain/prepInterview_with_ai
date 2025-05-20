import React from "react";
interface LoadingProps {
  message: string;
}

const Loading = (data: LoadingProps) => {
  return (
    <>
      <div className="min-h-screen  flex items-center justify-center">
        <div className="rounded-lg  flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-700 font-medium">
            {data.message || "Loading..."}
          </p>
        </div>
      </div>
    </>
  );
};

export default Loading;
