import React, { Component } from "react";
import UserFavoutiresContainer from "../components/Profile/UserFavourites/UserFavouritesContainer";
import Navigation from "../components/Profile/Navigation/Navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../contexts/UserContext";
export default class UserFavourites extends Component {
  render() {
    return (
      <div className="user-clothes">
        <Header />
        <div className="stretch-to-bottom">
          <div className="profile row">
            <Navigation />
            <UserContext.Consumer>
              {user => <UserFavoutiresContainer user={user} />}
            </UserContext.Consumer>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
