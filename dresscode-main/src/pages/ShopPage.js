import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CategoryLinks from "../components/CategoryLinks/CategoryLinks";
import ShopContainer from "../components/ShopContainer/ShopContainer";
export default function ShopPage() {
  return (
    <div className="shop-page stretch-to-bottom">
      <Header />
      <CategoryLinks />
      <div className="stretch-to-bottom">
        <ShopContainer />
        <Footer />
      </div>
    </div>
  );
}
