import React from "react";

export const DownArrow = (props) => {
  return (
    <button onClick={() => props.onSort('ASC')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        className="scale-50"
      >
        <path d="m11.998 17 7-8h-14z"></path>
      </svg>
    </button>
  );
};
