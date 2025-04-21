import React, { useState } from "react";

const Dropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all duration-300"
      >
        <i className="ri-filter-line"></i>
        <span>{title}</span>
      </button>
      {isOpen && (
        <div className="absolute top-8 right-0 w-48 bg-zinc-800 rounded-md shadow-lg p-2 z-50">
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="w-full text-left text-zinc-400 hover:text-white hover:bg-[#6656CD] p-2 rounded-md transition-all duration-300"
              >
                <i
                  className={`ri-${
                    option === "movie" ? "movie" : "tv"
                  }-line mr-2`}
                ></i>
                {option === "movie" ? "Movies" : "TV Shows"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
