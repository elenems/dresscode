import React from "react";
import LoaderSVG from "../assets/svg/loader.svg";
export default function Loader() {
  return (
    <div className="loader">
      <div className="loader-container">
        <img src={LoaderSVG} alt="Loading..." />
      </div>
    </div>
  );
}
