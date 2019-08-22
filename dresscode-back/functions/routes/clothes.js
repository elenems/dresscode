const Busboy = require("busboy");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { db } = require("../util/admin");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
//description, price, category, title, condition, brand, views, addedDate, likes, addedBy, comments

exports.addClothes = (req, res) => {
  const busboy = new Busboy({
    headers: req.headers
  });
  let uploadData = null;
  let link = null;
  let errors = {};

  if (!req.query.category.length) {
    errors["categoryError"] = "Please choose a category";
  }

  // return res.status(200).json({data:req.query})

  if (!req.query.title.length) {
    errors["titleError"] = "Must not be empty";
  }

  if (!req.query.brand.length) {
    errors["brandError"] = "Add clothes brand";
  }

  if (!req.query.condition.length) {
    errors["conditionError"] = "Add clothes condition";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const clothesInfo = req.query;
  if (!req.query.price.length) {
    clothesInfo.price = 0;
  } else {
    clothesInfo.price = parseFloat(req.query.price);
  }

  clothesInfo["likesCount"] = 0;
  clothesInfo["views"] = 0;
  clothesInfo["comments"] = [];
  clothesInfo["date"] = new Date().toUTCString();
  clothesInfo["condition"] = clothesInfo["condition"].toLowerCase();
  clothesInfo["category"] = clothesInfo["category"].toLowerCase();
  clothesInfo["brand"] = clothesInfo["brand"].toLowerCase();
  clothesInfo["size"] = clothesInfo["size"].toLowerCase();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }

    link = new Date().getTime() + filename;
    const filepath = path.join(os.tmpdir(), link);
    uploadData = { file: filepath, type: mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", () => {
    const bucketName = "dresscode-691e5.appspot.com";
    storage
      .bucket(bucketName)
      .upload(uploadData.file, {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: uploadData.type
          }
        }
      })
      .then(() => {
        link =
          "https://firebasestorage.googleapis.com/v0/b/dresscode-691e5.appspot.com/o/" +
          link +
          "?alt=media";
        db.collection("clothes").add({ image: link, ...clothesInfo });
      })
      .then(() => {
        return res.status(200).json({
          message: "Added successfuly"
        });
      })
      .catch(err => {
        return res
          .status(500)
          .json({ error: "Something went wrong, please try again later" });
      });
  });
  busboy.end(req.rawBody);
};

exports.getClothesItem = (req, res) => {
  const id = req.query.clothesId;
  db.collection("clothes")
    .doc(id)
    .get()
    .then(doc => {
      return res.status(200).json({
        id: doc.id,
        ...doc.data()
      });
    })
    .catch(e => {
      return res.status(500).json({ e: e });
    });
};

exports.removeClothes = (req, res) => {
  db.collection("clothes")
    .doc(req.body.clothesId)
    .delete()
    .then(() => {
      return res.status(200).json({ message: "Clothes removed successfuly" });
    })
    .catch(e => {
      return res
        .status(400)
        .json({ message: "Error while removing the clothes" });
    });
};

exports.incrementClothesView = (req, res) => {
  db.collection("clothes")
    .doc(req.body.clothesId)
    .get()
    .then(doc => {
      db.collection("clothes")
        .doc(req.body.clothesId)
        .update({
          views: parseInt(doc.data().views) + 1
        });
      return res.status(200).json({ message: "Clothes views incremented" });
    })
    .catch(e => {
      return res.status(400).json(e);
    });
};

exports.getUserClothes = (req, res) => {
  const clothes = [];
  db.collection("clothes")
    .where("addedBy", "==", req.query.userId)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return res.status(200).json({ message: "Not found" });
      }
      snapshot.forEach(doc => {
        clothes.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return res.status(200).json({ clothes });
    })
    .catch(e => {
      return res.status(400).json({ error: e });
    });
};

exports.likeClothes = (req, res) => {
  const clothesId = req.body.clothesId;
  const userId = req.body.userId;

  db.collection("users")
    .doc(userId)
    .get()
    .then(doc => {
      const likes = doc.data().likes;
      likes.push(clothesId);
      db.collection("users")
        .doc(userId)
        .update({
          likes
        });
    })
    .then(() => {
      return db
        .collection("clothes")
        .doc(clothesId)
        .get();
    })
    .then(doc => {
      const likes = doc.data().likesCount + 1;
      db.collection("clothes")
        .doc(clothesId)
        .update({
          likesCount: likes
        });
    })
    .then(() => {
      return res.status(200).json({ message: "Liked successfuly" });
    })
    .catch(e => {
      res.status(400).json({ error: "Can't like" });
    });
};

exports.unlikeClothes = (req, res) => {
  const clothesId = req.body.clothesId;
  const userId = req.body.userId;

  db.collection("users")
    .doc(userId)
    .get()
    .then(doc => {
      const likes = doc.data().likes.filter(like => {
        return clothesId !== like;
      });
      db.collection("users")
        .doc(userId)
        .update({
          likes
        });
    })
    .then(() => {
      return db
        .collection("clothes")
        .doc(clothesId)
        .get();
    })
    .then(doc => {
      const likes = doc.data().likesCount - 1;
      db.collection("clothes")
        .doc(clothesId)
        .update({
          likesCount: likes
        });
    })
    .then(() => {
      return res.status(200).json({ message: "Unliked successfuly" });
    })
    .catch(e => {
      res.status(400).json({ error: "Can't unlike" });
    });
};

exports.getLikedClothes = (req, res) => {
  const userId = req.query.userId;
  let userLikes = null;
  let likedClothes = [];
  db.collection("users")
    .doc(userId)
    .get()
    .then(doc => {
      userLikes = doc.data().likes;
      return db.collection("clothes").get();
    })
    .then(clothes => {
      if (userLikes !== null) {
        clothes.forEach(item => {
          if (
            userLikes.find(like => {
              return like === item.id;
            })
          ) {
            likedClothes.push({ id: item.id, ...item.data() });
          }
        });

        return res.status(200).json({ likedClothes });
      }
    })
    .catch(e => {
      return res.status(400).json({ error: e });
    });
};

exports.commentClothes = (req, res) => {
  const userId = req.body.userId;
  const clothesId = req.body.clothesId;
  let addedBy = "";
  let user = null;
  db.collection("users")
    .doc(userId)
    .get()
    .then(doc => {
      user = doc.data();
    })
    .then(() => {
      return db
        .collection("clothes")
        .doc(clothesId)
        .get();
    })
    .then(clothes => {
      const comments = clothes.data().comments;
      addedBy = clothes.data().addedBy;
      comments.push({
        commenterId: userId,
        commenterName: user.firstName,
        commenterLastName: user.lastName,
        commentText: req.body.commentText,
        postedAt: req.body.postedAt
      });
      db.collection("clothes")
        .doc(clothesId)
        .update({
          comments
        });
    })
    .then(() => {
      db.collection("users")
        .doc(addedBy)
        .get()
        .then(doc => {
          const notifications = doc.data().notifications;
          //  return res.status(200).json({ message: addedBy });
          notifications.push({
            id: new Date().getTime() + Math.random(),
            isRead: false,
            commenterId: userId,
            commenterName: user.firstName,
            commenterLastName: user.lastName,
            commentText: req.body.commentText,
            clothesId: req.body.clothesId,
            clothesTitle: req.body.clothesTitle
          });
          db.collection("users")
            .doc(addedBy)
            .update({
              notifications,
              unreadNotifications: doc.data().unreadNotifications + 1
            });
        });
    })
    .then(() => {
      return res.status(200).json({ message: "Added a comment" });
    })
    .catch(e => {
      return res.status(400).json({ error: "Error writing a comment" });
    });
};

exports.setNotificationRead = (req, res) => {
  const userId = req.body.userId;
  const notificationId = parseFloat(req.body.notificationId);

  db.collection("users")
    .doc(userId)
    .get()
    .then(user => {
      const notifications = user.data().notifications;
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i]["id"] === notificationId) {
          notifications[i]["isRead"] = true;
          message = "true";
          break;
        }
      }
      db.collection("users")
        .doc(userId)
        .update({
          notifications
        });
      return res.status(200).json({ message: "success" });
    })
    .catch(e => {
      return res.status(400).json({ error: "error" });
    });
};

exports.getClothesFromSearch = (req, res) => {
  const text = req.body.text;
  const items = [];
  db.collection("clothes")
    .orderBy("title")
    .startAt(text)
    .limit(10)
    .get()
    .then(snapshot => {
      snapshot.forEach(clothes => {
        items.push({ id: clothes.id, title: clothes.data().title });
      });
      return res.status(200).json({ items, snapshot });
    })
    .catch(e => {
      return res.status(400).json({ error: e });
    });
};

exports.getPopularClothes = (req, res) => {
  const limit = parseInt(req.query.limit);
  const items = [];
  db.collection("clothes")
    .orderBy("likesCount", "desc")
    .limit(limit)
    .get()
    .then(clothes => {
      clothes.forEach(item => {
        items.push({
          id: item.id,
          ...item.data()
        });
      });
      return res.status(200).json({
        items
      });
    })
    .catch(e => {
      return res.status(400).json({ error: "Can't get popular clothes" });
    });
};

exports.getClothesUnder100 = (req, res) => {
  const limit = parseInt(req.query.limit);
  const items = [];
  db.collection("clothes")
    .where("price", "<", 100)
    .limit(limit)
    .get()
    .then(clothes => {
      clothes.forEach(item => {
        items.push({
          id: item.id,
          ...item.data()
        });
      });
      return res.status(200).json({
        items
      });
    })
    .catch(e => {
      return res.status(400).json({ error: "Can't get under 100 clothes" });
    });
};

exports.getClothesFromQuery = (req, res) => {
  //category, title, size, brand, from, to
  const clothes = [];
  let clothesRef = db.collection("clothes");
  let priceFrom = 0;
  let priceTo = 1000000;

  if (req.body.from) {
    priceFrom = parseInt(req.body.from);
  }

  if (req.body.to) {
    {
      priceTo = parseInt(req.body.to);
    }
  }

  if (req.body.category && req.body.category !== "all") {
    clothesRef = clothesRef.where("category", "==", req.body.category.toLowerCase());
  }
 
  if (req.body.condition && req.body.condition.length) {
    if(req.body.condition.toLowerCase() !== 'all'){
    clothesRef = clothesRef.where("condition", "==", req.body.condition.toLowerCase());
    }
  }

  if (req.body.brand && req.body.brand.length) {
    clothesRef = clothesRef.where("brand", "==", req.body.brand.toLowerCase());
  }

  if (req.body.title && req.body.title.length) {
    clothesRef = clothesRef.where("title", "==", req.body.title);
  }

  if (req.body.size && req.body.size.length) {
    clothesRef = clothesRef.where("size", "==", req.body.size.toLowerCase());
  }

  clothesRef
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return res.status(200).json({clothes:[]});
      }
      let docPrice = 0;
      snapshot.forEach(doc => {
        docPrice = doc.data().price;
        if (docPrice < priceTo && docPrice > priceFrom) {
          clothes.push({
            id: doc.id,
            ...doc.data()
          });
        }
      });

      return res.status(200).json({ clothes });
    })
    .catch(e => {
      return res.status(400).json({ errorMessage: e });
    });
};
