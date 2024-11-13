import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="custom-spinner">
        <div className="point">
          <div className="ripple"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
