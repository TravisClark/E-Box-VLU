import React from "react";

export const UpArrow = (props) => {
    
  return (
    <button onClick={() => console.log("click")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        className="scale-75"
      >
        <path d="M5 15h14l-7-8z"></path>
      </svg>
    </button>
  );
};
