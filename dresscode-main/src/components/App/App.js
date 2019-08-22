import React, { useContext } from "react";
import axios from "axios";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import Signup from "../../pages/Signup";
import Signin from "../../pages/Signin";
import { UserContext } from "../../contexts/UserContext";
import UserSettings from "../../pages/UserSettings";
import UserMessages from "../../pages/UserMessages";
import UserFavourites from "../../pages/UserFavourites";
import UserClothes from "../../pages/UserClothes";
import SellPage from "../../pages/SellPage";
import ClothesItemPage from "../../pages/ClothesItemPage";
import UserPage from "../../pages/UserPage";
import Chat from "../../pages/Chat";
import ShopPage from "../../pages/ShopPage";
import PageNotFound from "../../pages/PageNotFound";

axios.defaults.baseURL =
  "https://europe-west2-dresscode-691e5.cloudfunctions.net/api";

function App() {
  const user = useContext(UserContext);
  let isAuthenticated = false;
  if (localStorage.getItem("token") && !user.isAuthenticated) {
    user.authenticateUser(localStorage.getItem("token"));
  }

  if (localStorage.getItem("token")) {
    isAuthenticated = true;
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/users/:id" exact component={UserPage} />

        <Route
          path="/clothes/:id"
          render={props => (
            <ClothesItemPage key={props.match.params.id} {...props} />
          )}
        />

        <Route path="/shop" exact component={ShopPage} />

        <Route
          exact
          path="/login"
          render={props =>
            isAuthenticated ? <Redirect to="/" /> : <Signin {...props} />
          }
        />

        <Route
          exact
          path="/chat/:id"
          render={props =>
            !isAuthenticated ? <Redirect to="/" /> : <Chat {...props} />
          }
        />

        <Route
          exact
          path="/signup"
          render={props =>
            isAuthenticated ? <Redirect to="/" /> : <Signup {...props} />
          }
        />

        <Route
          exact
          path="/profile/settings"
          render={props =>
            !isAuthenticated ? <Redirect to="/" /> : <UserSettings {...props} />
          }
        />

        <Route
          exact
          path="/profile/messages"
          render={props =>
            !isAuthenticated ? <Redirect to="/" /> : <UserMessages {...props} />
          }
        />

        <Route
          exact
          path="/profile/favourites"
          render={props =>
            !isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <UserFavourites {...props} />
            )
          }
        />

        <Route
          exact
          path="/profile/clothes"
          render={props =>
            !isAuthenticated ? <Redirect to="/" /> : <UserClothes {...props} />
          }
        />

        <Route
          exact
          path="/sell"
          render={props =>
            !isAuthenticated ? (
              <Redirect to="/login" />
            ) : (
              <SellPage {...props} />
            )
          }
        />

        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
