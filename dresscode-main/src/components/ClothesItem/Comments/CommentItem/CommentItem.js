import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CommentItem(props) {
  const {
    commenterId,
    commenterLastName,
    commenterName,
    commentText,
    postedAt
  } = props.comment;
  return (
    <div className="comment">
      <div className="comment-details">
        <Link to={`/users/${commenterId}`}>
          {commenterLastName} {commenterName}
        </Link>
        <span>{postedAt.slice(0, -4)}</span>
      </div>
      <p>{commentText}</p>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired
};

export default React.memo(CommentItem);
