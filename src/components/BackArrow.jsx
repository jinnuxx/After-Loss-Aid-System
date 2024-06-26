import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackArrow = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const renderSvgPath = () => {
    return isHovered ? (
      <>
        <path
          d="M5 12H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 5L5 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <>
        <path
          d="M5 12H24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 5L5 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    );
  };

  return (
    <div
      className="cursor-pointer flex items-center"
      onClick={handleBack}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-red-500 transition duration-300 ease-in-out"
      >
        {renderSvgPath()}
      </svg>
      <span
        className={`text-red-500 transition-all duration-300 ${isHovered ? "ml-[1px]" : "ml-2"}`}
      >
        Back
      </span>
    </div>
  );
};

export default BackArrow;
