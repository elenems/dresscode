import React from "react";
import { withRouter } from "react-router-dom";
function CategoryLinks(props) {
  const moveToCategory = (link, category) => {
    window.setCategory(category);
    window.setTitle("");
    props.history.push(link);
  };
  return (
    <div className="header-bottom-links row space-after-header">
      <nav>
        <ul className="inline-list">
          <li
            className="link-style"
            onClick={() => moveToCategory("/shop?category=tops", "tops")}
          >
            Tops
          </li>
          <li
            className="link-style"
            onClick={() => moveToCategory("/shop?category=bottoms", "bottoms")}
          >
            Bottoms
          </li>
          <li
            className="link-style"
            onClick={() => moveToCategory("/shop?category=outwear", "outwear")}
          >
            Outwear
          </li>
          <li
            className="link-style"
            onClick={() => moveToCategory("/shop?category=boots", "boots")}
          >
            Boots
          </li>
          <li
            className="link-style"
            onClick={() =>
              moveToCategory("/shop?category=sneakers", "sneakers")
            }
          >
            Sneakers
          </li>
          <li
            className="link-style"
            onClick={() => moveToCategory("/shop?category=hats", "hats")}
          >
            Hats
          </li>
          <li
            className="link-style"
            onClick={() =>
              moveToCategory("/shop?category=accessories", "accessories")
            }
          >
            Accessories
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(React.memo(CategoryLinks));
