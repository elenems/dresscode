import React, { Component } from "react";
import PostComment from "./PostComments/PostComments";
import CommentItem from "./CommentItem/CommentItem";
import axios from "axios";
export default class Comments extends Component {
  state = {
    comments: [],
    commentText: "",
    message: ""
  };
  componentDidMount() {
    this.setState({
      comments: this.props.comments.reverse()
    });
  }
  addComment = e => {
    if (this.state.commentText.length < 1) {
      this.setState({ message: "Write a comment before submiting!" });
    } else if (!this.props.user.isAuthenticated) {
      this.setState({ message: "You need to be authorized" });
    } else {
      e.preventDefault();
      const comment = {
        clothesId: this.props.clothesId,
        userId: this.props.user.user.userId,
        commentText: this.state.commentText,
        postedAt: new Date().toUTCString(),
        clothesTitle: this.props.clothesTitle
      };
      axios
        .post("/commentClothes", comment)
        .then(d => {
          this.setState({
            commentText: "",
            comments: [
              {
                commenterId: comment.userId,
                commentText: comment.commentText,
                commenterLastName: this.props.user.user.lastName,
                commenterName: this.props.user.user.firstName,
                postedAt: comment.postedAt,
                clothesId: this.props.clothesId,
                clothesTitle: this.props.clothesTitle
              },
              ...this.state.comments
            ],
            message: ""
          });
        })
        .catch(e => {
          this.setState({
            message: "Error posting a comment"
          });
        });
    }
  };

  handleChange = e => {
    this.setState({
      commentText: e.target.value
    });
  };

  render() {
    const { comments } = this.state;
    return (
      <div className="comments row">
        <PostComment
          handleChange={this.handleChange}
          commentText={this.state.commentText}
          addComment={this.addComment}
        />
        {!comments.length ? (
          <div>
            <p className="text-center">
              No comments yet, start the conversation
            </p>
            {this.state.message.length ? (
              <p style={{ color: "#de3650" }} className="message">
                {this.state.message}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="comments-wall">
            {this.state.message.length ? (
              <p style={{ color: "#de3650" }} className="message">
                {this.state.message}
              </p>
            ) : null}

            {comments.map(comment => {
              return (
                <CommentItem
                  key={comment.commentText + new Date()}
                  comment={comment}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
