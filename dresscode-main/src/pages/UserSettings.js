import React, { Component } from "react";
import Navigation from "../components/Profile/Navigation/Navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SettingsForm from "../components/Profile/SettingsForm/SettingsForm";
import { UserContext } from "../contexts/UserContext";
export default class UserSettings extends Component {
  render() {
    return (
      <div className="user-settings">
        <Header />
        <div className="stretch-to-bottom">
          <div className="profile row">
            <Navigation />
            <UserContext.Consumer>
              {user => <SettingsForm user={user} />}
            </UserContext.Consumer>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
