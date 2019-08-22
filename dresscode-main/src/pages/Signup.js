import React, { Component } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SignupForm from "../components/SignupForm/SignupForm";

export default class Signup extends Component {
  render() {
    return (
      <div className='signup-page'>
        <Header />
        <div className='stretch-to-bottom'>
        <SignupForm />
        <Footer />
        </div>
      </div>
    );
  }
}
