import React, { Component } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SigninForm from "../components/SigninForm/SigninForm";

export default class Signin extends Component {
  render() {
    return (
      <div className="signin-page">
        <Header />
        <div className="stretch-to-bottom">
          <SigninForm />
          <Footer />
        </div>
      </div>
    );
  }
}
