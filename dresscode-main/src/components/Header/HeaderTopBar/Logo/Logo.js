import React from "react";
import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <div className="logo-container">
      <Link to="/">
        <span title="Main page" className="logo-container__logo">
          D
        </span>
      </Link>
    </div>
  );
}
