import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
import PropTypes from "prop-types";
function Card(props) {
  return (
    <div className="card">
      <Link to={props.link}>
        <div className="card__card-content">
          <Icon name={props.name} />
          <div>
            <p>{props.text}</p>
            <span className="card__link">{props.linkText}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

Card.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  linkText: PropTypes.string
};

export default React.memo(Card);
