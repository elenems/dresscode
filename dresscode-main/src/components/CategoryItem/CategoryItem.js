import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function CategoryItem(props) {
  return (
    <div>
      <Link to={{ pathname: props.link, search: props.search }}>
        <img src={props.image} alt={props.categoryName} />
        <p>{props.categoryName}</p>
      </Link>
    </div>
  );
}

CategoryItem.propTypes = {
  link: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired
};

export default React.memo(CategoryItem);
