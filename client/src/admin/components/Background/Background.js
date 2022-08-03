import React from "react";

function Background(props) {
  
  return (
    <div className="w-full bg-slate-200 flex" style={{ minHeight: '800px'}}>
      {props.children}
    </div>
  );
}

export default Background;
