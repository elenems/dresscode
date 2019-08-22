import React from "react";
import PropTypes from "prop-types";

function PostComments(props) {
  return (
    <div>
      <span className="label-style">Add a coment</span>
      <div className="post-comment-form">
        <textarea onChange={props.handleChange} value={props.commentText} />
        <button className="primary-button" onClick={props.addComment}>
          Add a comment
        </button>
      </div>
    </div>
  );
}

PostComments.propTypes = {
  commentText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
};

export default React.memo(PostComments);
