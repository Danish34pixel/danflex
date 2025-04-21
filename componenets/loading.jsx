import React, { useState, useEffect } from "react";

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-[#1F1E24] transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img src="/load.gif" alt="Loading..." className="w-32 h-32" />
    </div>
  );
};

export default Loading;
