const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();
app.use(cors());

const {
  changeUserInfo,
  signIn,
  signOut,
  signUp,
  getUser
} = require("./routes/user");

const {
    sendMessage,
    removeUserChat,
    removeUnreadNotifications,
    setMessageRead,
    getChat
} = require("./routes/chats")

const {
  addClothes,
  getClothesItem,
  removeClothes,
  incrementClothesView,
  getUserClothes,
  likeClothes,
  unlikeClothes,
  getLikedClothes,
  commentClothes,
  setNotificationRead,
  getClothesFromSearch,
  getPopularClothes,
  getClothesUnder100,
  getClothesFromQuery
} = require("./routes/clothes");

//Users
app.get("/getUser", getUser);
app.post("/changeUserInfo", changeUserInfo);
app.post("/signIn", signIn);
app.post("/signOut", signOut);
app.post("/signUp", signUp);

//Clothes
app.post("/addClothes", addClothes);
app.post("/removeClothes", removeClothes);
app.post("/incrementClothesView", incrementClothesView);
app.get("/getUserClothes", getUserClothes);
app.post("/likeClothes", likeClothes);
app.post("/unlikeClothes", unlikeClothes);
app.get("/getLikedClothes", getLikedClothes);
app.post("/commentClothes", commentClothes);
app.post("/setNotificationRead", setNotificationRead);
app.post('/getClothesFromSearch',getClothesFromSearch);
app.get('/getPopularClothes', getPopularClothes);
app.get('/getClothesUnder100', getClothesUnder100);
app.get('/getClothesItem', getClothesItem );
app.post('/getClothesFromQuery', getClothesFromQuery);

app.post("/sendMessage", sendMessage);
app.post("/removeUserChat", removeUserChat);
app.post("/removeUnreadNotifications", removeUnreadNotifications);
app.post("/setMessageRead",setMessageRead)
app.get('/getChat',getChat);
exports.api = functions.region("europe-west2").https.onRequest(app);
