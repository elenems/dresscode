import React from "react";
import { IconContext } from "react-icons";
import { MdSearch } from "react-icons/md";
import PropTypes from "prop-types";
import { MdShoppingCart } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdAirplanemodeActive } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
const Icon = React.memo(function Icon(props) {
  let icon = null;
  const color = props.color;
  switch (props.name) {
    case "left-arrow":
      icon = <MdKeyboardArrowLeft />;
      break;
    case "right-arrow":
      icon = <MdKeyboardArrowRight />;
      break;
    case "notification":
      icon = <MdNotificationsNone />;
      break;
    case "twitter":
      icon = <FaTwitter />;
      break;
    case "youtube":
      icon = <FaYoutube />;
      break;
    case "linkedin":
      icon = <FaLinkedinIn />;
      break;
    case "instagram":
      icon = <FaInstagram />;
      break;
    case "facebook":
      icon = <FaFacebookF />;
      break;
    case "heart-fill":
      icon = <MdFavorite />;
      break;
    case "heart":
      icon = <MdFavoriteBorder />;
      break;
    case "airplain":
      icon = <MdAirplanemodeActive />;
      break;
    case "money":
      icon = <MdAttachMoney />;
      break;
    case "search":
      icon = <MdSearch />;
      break;
    case "shopCart":
      icon = <MdShoppingCart />;
      break;
    default:
      icon = null;
  }
  return (
    <IconContext.Provider value={{ color: color }}>
      <span className="icon">{icon}</span>
    </IconContext.Provider>
  );
});

Icon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired
};

Icon.defaultProps = {
  color: "black"
};

export default Icon;
