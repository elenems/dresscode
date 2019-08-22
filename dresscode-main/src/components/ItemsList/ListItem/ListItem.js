import React from "react";
import Icon from "../../../utils/Icon";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
//#f54c4c
function ListItem(props) {
  const { title, price, image, size, id, description } = props.item;

  // const [isLiked, setIsLiked] = useState(props.user.checkIsLiked(id))
  const isLiked = props.user.checkIsLiked(id);

  const toggleLike = () => {
    if (props.user.isAuthenticated) {
      if (isLiked) {
        axios
          .post("/unlikeClothes", {
            clothesId: id,
            userId: props.user.user.userId
          })
          .then(d => {
            props.user.unlikeClothes(id);
            // setIsLiked(false);
          })
          .catch(d => {});
      } else {
        axios
          .post("/likeClothes", {
            clothesId: id,
            userId: props.user.user.userId
          })
          .then(d => {
            props.user.likeClothes(id);
            // setIsLiked(true);
          })
          .catch(d => {});
      }
    } else {
      alert("signin");
    }
  };

  const icon = isLiked
    ? { color: "#de3650", name: "heart-fill", text: "Unlike" }
    : { color: "black", name: "heart", text: "Like" };
  return (
    <div className="items-list__list-item">
      <Link to={`/clothes/${id}`}>
        <div className="items-list__image">
          <img src={image} alt={title} />
        </div>
        <div className="items-list__top-section">
          <h4>{title.length > 20 ? title.slice(0, 20) + "..." : title}</h4>
          <span>
            <b>{size}</b>
          </span>
        </div>
        <p className="items-list__item-description">
          {description.length > 24
            ? description.slice(0, 24) + "..."
            : description}
        </p>
      </Link>
      <div className="items-list__bottom-section">
        <span>
          <b>${price}</b>
        </span>
        <span title={icon.text} onClick={toggleLike} className="item-icon">
          <Icon color={icon.color} name={icon.name} />
        </span>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default React.memo(ListItem);
