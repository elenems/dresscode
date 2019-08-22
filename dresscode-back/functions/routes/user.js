const { db } = require("../util/admin");
const firebase = require("firebase");
require("firebase/auth");
const firebaseConfig = require("../util/config");
firebase.initializeApp(firebaseConfig);
const {
  validateEmail,
  validatePassword,
  validateCred,
  validatePhone
} = require("../util/validators");

exports.signUp = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    signUpDate: new Date().toLocaleDateString(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userId: req.body.email,
    location: "",
    likes: [],
    notifications: [],
    chats:[],
    unreadNotifications:0
  };

  const errors = {};

  const email = validateEmail(user.email);
  const password = validatePassword(user.password, user.confirmPassword);
  const firstName = validateCred(user.firstName);
  const lastName = validateCred(user.lastName);
  const confirmPassword = validatePassword(user.confirmPassword, user.password)

  if (!email.valid) {
    errors["emailError"] = email.message;
  }

  if (!firstName.valid) {
    errors["firstNameError"] = firstName.message;
  }

  if (!lastName.valid) {
    errors["lastNameError"] = lastName.message;
  }

  if (!password.valid) {
    errors["passwordError"] = password.message;
  }

  if (!confirmPassword.valid) {
    errors["confirmPasswordError"] = confirmPassword.message;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  let token;
  db.doc(`/users/${user.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ emailError: "This email is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password);
      }
    })
    .then(data => {
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      return db.doc(`/users/${user.email}`).set(user);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ emailError: "Email is already is use" });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      }
    });
};

exports.signIn = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const errors = {};

  const email = validateEmail(user.email);
  const password = validatePassword(user.password);

  if (!email.valid) {
    errors["emailError"] = email.message;
  }

  if (!password.valid) {
    errors["passwordError"] = password.message;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      // auth/wrong-password
      // auth/user-not-user
      errors["emailError"] = "Wrong credentials, please try again";
      errors["passwordError"] = "Wrong credentials, please try again";
      return res.status(403).json(errors);
    });
};

exports.getUser = (req, res) => {
  const id = req.query.userId;
  db.collection("users")
    .doc(id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ noSuchDocError: "No such document" });
      } else {
        return res.status(200).json(Object.assign({ id: doc.id }, doc.data()));
      }
    })
    .catch(err => {
      return res.status(403).json({ err });
    });
};

exports.signOut = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      return res.status(200).json({ message: "Signed out successfuly" });
    })
    .catch(err => {
      return res.status(400).json({ err });
    });
};

exports.changeUserInfo = (req, res) => {
  let user;
  let newUser = req.body;
  const errors = {};

  let firstName = { valid: true };
  let lastName = { valid: true };
  let location = { valid: true };

  // if (newUser.firstName) {
    firstName = validateCred(newUser.firstName);
  // }

  // if (newUser.lastName) {
    lastName = validateCred(newUser.lastName);
  // }

  // if (newUser.location) {
    location = validateCred(newUser.location);
  // }

  if (!location.valid) {
    errors["locationError"] = location.message;
  }

  if (!firstName.valid) {
    errors["firstNameError"] = firstName.message;
  }

  if (!lastName.valid) {
    errors["lastNameError"] = lastName.message;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  // db.collection('users').doc(req.body.email).set(Object.assign(user, newUser))
  db.collection("users")
    .doc(req.body.userId)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(400).json({ noSuchDocError: "No such document" });
      } else {
        user = doc.data();
        return db
          .collection("users")
          .doc(req.body.userId)
          .set(Object.assign(user, newUser));
      }
    })
    .then(() => {
      return res.status(200).json({ message: "User info has been updated" });
    })
    .catch(err => {
      return res.status(400).json({ err });
    });
};
