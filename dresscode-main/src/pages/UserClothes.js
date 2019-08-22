import React, { Component } from "react";
import Navigation from "../components/Profile/Navigation/Navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import UserClothesContiner from "../components/Profile/UserClothes/UserClothesContainer";
import { UserContext } from "../contexts/UserContext";

export default class UserClothes extends Component {
  render() {
    return (
      <div className="user-clothes">
        <Header />
        <div className="stretch-to-bottom">
          <div className="profile row">
            <Navigation />
            <UserContext.Consumer>
              {user => <UserClothesContiner user={user} />}
            </UserContext.Consumer>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
