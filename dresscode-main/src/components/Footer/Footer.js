import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../utils/Icon";
function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <ul className="inline-list">
          <li>
            <Link to="/shop">About</Link>
          </li>
          <li>
            <Link to="/shop">Help</Link>
          </li>
          <li>
            <Link to="/shop">Terms</Link>
          </li>
          <li>
            <Link to="/shop">Accessability</Link>
          </li>
          <li>
            <Link to="/shop">App</Link>
          </li>
        </ul>
      </div>
      <div className="footer-social">
        <ul className="inline-list">
          <li>
            <a target="blank" href="https://facebook.com">
              <Icon name="facebook" />
            </a>
          </li>
          <li>
            <a target="blank" href="https://instagram.com">
              <Icon name="instagram" />
            </a>
          </li>
          <li>
            <a target="blank" href="https://twitter.com">
              <Icon name="twitter" />
            </a>
          </li>
          <li>
            <a target="blank" href="https://youtube.com">
              <Icon name="youtube" />
            </a>
          </li>
          <li>
            <a target="blank" href="https://linkedin.com">
              <Icon name="linkedin" />
            </a>
          </li>
        </ul>
        <p>
          <strong>Dresscode &copy; 2019</strong>
        </p>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
