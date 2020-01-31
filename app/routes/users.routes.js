module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    // Create a new user
    app.post("/users", users.create);
    // POST http://localhost:3000/users

    // Retrieve all users
    app.get("/users", users.findAll);
    // GET http://localhost:3000/users

    // Retrieve a single user with userId
    app.get("/users/:uid", users.findOne);
    // GET http://localhost:3000/users/uid

    // Update a user with userId
    app.put("/users/:uid", users.update);
    // PUT http://localhost:3000/users/uid

    // Delete a user with userId
    app.delete("/users/:uid", users.delete);
    // DEL http://localhost:3000/users/uid

    // Delete all users
    app.delete("/users", users.deleteAll);
    // DEL http://localhost:3000/users
  };