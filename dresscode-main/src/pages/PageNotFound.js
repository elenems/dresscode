import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CategoryLinks from "../components/CategoryLinks/CategoryLinks";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <div className="not-found-page stretch-to-bottom">
      <Header />
      <CategoryLinks />
      <div className="stretch-to-bottom">
        <div className="baner not-found-block">
          <div className="text-center">
            <h4>Page not found</h4>
            <Link to="/">To main page</Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
