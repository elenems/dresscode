import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import UserContainer from "../components/UserContainer/UserContainer";
import { UserContext } from "../contexts/UserContext";
import CategoryLinks from '../components/CategoryLinks/CategoryLinks';
function UserPage() {
  return (
    <div className="user-page">
      <Header />
      <div className="stretch-to-bottom">
        <CategoryLinks />
        <UserContext.Consumer>
          {user => <UserContainer user={user} />}
        </UserContext.Consumer>
        <Footer />
      </div>
    </div>
  );
}

export default UserPage;
