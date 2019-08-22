import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default class TypingProposals extends Component {
  state = {
    searchResults: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const nextStateType = typeof nextState.searchResults;
    const thisStateType = typeof this.state.searchResults;
    if (nextProps.text !== this.props.text || thisStateType !== nextStateType) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    axios
      .post("/getClothesFromSearch", { text: this.props.text })
      .then(data => {
        this.setState({
          searchResults: data.data.items
        });
      })
      .catch(e => {});
  }

  render() {
    const content = !this.state.searchResults.length ? (
      <p>No items found</p>
    ) : (
      <ul>
        {this.state.searchResults.map(item => {
          return (
            <li
              className="link-style"
              onClick={() =>
                this.props.moveToLink(
                  `/shop?category=all&title=${item.title}`,
                  item.title
                )
              }
              key={item.id}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    );
    return (
      <div id="typingProposals" className="typing-proposals">
        {content}
      </div>
    );
  }
}

TypingProposals.propTypes = {
  searchResults: PropTypes.array
};
