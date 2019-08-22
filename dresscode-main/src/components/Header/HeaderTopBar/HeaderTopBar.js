import React, { Component } from "react";
import Logo from "./Logo/Logo";
import SearchBar from "../HeaderTopBar/Searhbar/SearchBar";
import HeaderControls from "../HeaderTopBar/HeaderControlls/HeaderControls";
export default class HeaderTopBar extends Component {
  render() {
    return (
      <div className="header-top-bar row-stretch">
        <div id='barLeftSide' className="bar-left-side">
          <Logo />
          <SearchBar />
        </div>
        <HeaderControls />
      </div>
    );
  }
}
