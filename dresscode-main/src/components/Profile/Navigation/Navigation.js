import React from "react";
import { NavLink } from "react-router-dom";
export default function Navigation() {
  return (
    <div className="profile-navigation">
      <nav>
        <ul className="profile-links">
          <li>
            <NavLink
              activeClassName="selected-profile-link"
              to="/profile/messages"
            >
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="selected-profile-link"
              to="/profile/favourites"
            >
              Favourites
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="selected-profile-link"
              to="/profile/clothes"
            >
              Clothes
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="selected-profile-link"
              to="/profile/settings"
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
