import React, { Component } from "react";
import Navigation from "../components/Profile/Navigation/Navigation";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ChatContainer from "../components/Profile/ChatContainer/ChatContainer";
export default class Chat extends Component {
  render() {
    return (
      <div className="chat-page">
        <Header />
        <div className="stretch-to-bottom">
          <div className="row profile">
            <Navigation />
            <ChatContainer {...this.props} />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
