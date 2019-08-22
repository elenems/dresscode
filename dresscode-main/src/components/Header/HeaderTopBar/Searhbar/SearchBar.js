import React, { Component } from "react";
import Icon from "../../../../utils/Icon";
import TypingProposals from "./TypingProposals/TypingProposals";
import { withRouter } from "react-router-dom";
class SearchBar extends Component {
  state = {
    searchText: ""
  };

  componentDidMount() {
    document.getElementById("searchText").addEventListener("focusin", () => {
      document.getElementById("typingProposals").style.display = "block";
    });

    document.getElementById("searchText").addEventListener("focusout", () => {
      setTimeout(() => {
        document.getElementById("typingProposals").style.display = "none";
      }, 100);
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const title = this.state.searchText.length
      ? `&title=${this.state.searchText}`
      : "";
    window.setTitle(this.state.searchText);
    this.props.history.push(`/shop?category=all${title}`);
  };

  moveToLink = (link, title) => {
    window.setTitle(title);
    window.setCategory("all");
    this.props.history.push(link);
    this.setState({
      searchText: ""
    });
  };

  render() {
    return (
      <div className="search-bar">
        <form id='searchForm'>
          <div className="search-bar__search-input-container">
            <Icon color="black" name="search" />
            <input
              title="Enter clothes title"
              autoComplete="off"
              placeholder="search"
              id="searchText"
              value={this.state.searchText}
              onChange={this.handleChange}
            />
          </div>

          <button
            title="Search"
            className="primary-button"
            onClick={this.handleSubmit}
          >
            Search
          </button>
        </form>
        <TypingProposals
          moveToLink={this.moveToLink}
          text={this.state.searchText}
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
