import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full mt-4">
      <div className="loader">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
