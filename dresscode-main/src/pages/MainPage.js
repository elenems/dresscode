import React from "react";
import Header from "../components/Header/Header";
import CaregoryLinks from "../components/CategoryLinks/CategoryLinks";
import Card from "../components/Card/Card";
import cards from "../data/cards";
import CategoryItem from "../components/CategoryItem/CategoryItem";
import categoryItems from "../data/categoryItems";
import ItemsList from "../components/ItemsList/ItemsList";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function MainPage() {
  return (
    <div>
      <Header />
      <CaregoryLinks />
      <UserContext.Consumer>
        {user => (
          <main className="row">
            <div className="cards-container module">
              {cards.map(card => {
                return (
                  <Card
                    key={card.name}
                    name={card.name}
                    text={card.text}
                    linkText={card.linkText}
                    link={card.link}
                  />
                );
              })}
            </div>

            <div className="module">
              <h2>Shop by category</h2>
              <div className="category-container">
                {categoryItems.map(item => {
                  return (
                    <CategoryItem
                      key={item.categoryName}
                      link={item.link}
                      image={item.image}
                      search={item.search}
                      categoryName={item.categoryName}
                    />
                  );
                })}
              </div>
            </div>

            <div className="module">
              <h2>Popular</h2>
              <ItemsList user={user} limit={12} fetchLink="getPopularClothes" />
            </div>

            <div className="module">
              <h2>Deals: Under 100$</h2>
              <ItemsList
                user={user}
                limit={12}
                fetchLink="getClothesUnder100"
              />
            </div>
          </main>
        )}
      </UserContext.Consumer>

      <div id="shop-baner" className="row-stretch baner">
        <div className="text-center">
          <h1>
            The world's largest marketplace for clothes and modern fashion
          </h1>
          <span className="baner-link-container">
            <Link to="/shop">Shop the feed</Link>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
