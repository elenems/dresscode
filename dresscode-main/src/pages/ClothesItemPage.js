import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ClothesItem from "../components/ClothesItem/ClothesItem";
import CategoryLinks from "../components/CategoryLinks/CategoryLinks";
import { UserContext } from "../contexts/UserContext";
export default function ClothesItemPage() {
  return (
    <div className="clothes-item-page">
      <Header />
      <CategoryLinks />
      <UserContext.Consumer>
        {user => <ClothesItem user={user} />}
      </UserContext.Consumer>
      <Footer />
    </div>
  );
}
