const sql = require("./db.js");

// constructor
const User = function(users) {
  this.username = users.username;
  this.mail = users.mail;
  this.password = users.password;
  this.token = users.token;
  this.uid = users.uid;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET username = ?, mail = ?, password = MD5(?), token = ?, uid = UUID()", 
  [newUser.username, newUser.mail, newUser.password, newUser.token],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { uid: res.insertuid, ...newUser });
    result(null, { uid: res.insertuid, ...newUser });
  });
};

User.findByUid = (uid, result) => {
  sql.query(`SELECT * FROM users WHERE uid = ${uid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the uid
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateByUid = (uid, user, result) => {
  sql.query(
    "UPDATE users SET mail = ?, username = ?, password = MD5(?), token = ? WHERE uid = ?",
    [user.mail, user.username, user.password, user.token, user.uid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the uid
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { uid: uid, ...user });
      result(null, { uid: uid, ...user });
    }
  );
};

User.remove = (uid, result) => {
  sql.query("DELETE FROM users WHERE uid = ?", uid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the uid
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with uid: ", uid);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
