import React, { Component } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SellItem from "../components/SellItem/SellItem";
import ClothesCategories from "../components/CategoryLinks/CategoryLinks";
import { UserContext } from "../contexts/UserContext";
export default class SellPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <ClothesCategories />
        <UserContext.Consumer>
          {user => <SellItem user={user} />}
        </UserContext.Consumer>
        <Footer />
      </div>
    );
  }
}
