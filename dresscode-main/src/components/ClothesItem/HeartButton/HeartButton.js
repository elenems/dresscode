import React from "react";
import Icon from "../../../utils/Icon";
import axios from "axios";
import PropTypes from "prop-types";

function HeartButton(props) {
  const isLiked = props.user.checkIsLiked(props.clothesId);

  const likeStatus = isLiked
    ? { iconName: "heart-fill", color: "#de3650", title: "Unlike" }
    : { iconName: "heart", color: "#000", title: "Like" };

  const toggleLike = id => {
    if (props.user.isAuthenticated) {
      if (isLiked) {
        props.user.unlikeClothes(id);
        axios.post("/unlikeClothes", {
          clothesId: id,
          userId: props.user.user.userId
        });
      } else {
        props.user.likeClothes(id);
        axios.post("/likeClothes", {
          clothesId: id,
          userId: props.user.user.userId
        });
      }
    } else {
      alert("Login to like");
    }
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      title={likeStatus.title}
      onClick={() => toggleLike(props.clothesId)}
    >
      <Icon color={likeStatus.color} name={likeStatus.iconName} />
      {props.likesCount}
    </div>
  );
}

HeartButton.propTypes = {
  clothesId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default React.memo(HeartButton);
