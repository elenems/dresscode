import React, { Component } from "react";
import MessagesList from "../components/MessagesList/MessagesList";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Profile/Navigation/Navigation";
export default class UserMessages extends Component {
  render() {
    return (
      <div className="profile-messages">
        <Header />
        <div className="stretch-to-bottom">
          <div className="row profile">
            <Navigation />
            <MessagesList />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
