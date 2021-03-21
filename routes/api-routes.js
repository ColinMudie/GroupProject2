// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    // console.log(req.user);
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(result => {
        db.Character.bulkCreate([
          {
            class: "Warrior",
            hp: 100,
            attack: 75,
            xp: 0,
            lvl: 1,
            UserId: result.id
          },
          {
            class: "Huntress",
            hp: 100,
            attack: 85,
            xp: 0,
            lvl: 1,
            UserId: result.id
          },
          {
            class: "Archer",
            hp: 100,
            attack: 45,
            xp: 0,
            lvl: 1,
            UserId: result.id
          },
          {
            class: "Mage",
            hp: 100,
            attack: 60,
            xp: 0,
            lvl: 1,
            UserId: result.id
          }
        ]);
      })
      .then(() => {
        console.log("created a new user");
        res.redirect(307, "/api/login");
        // res.render("members", { title: "Member" });
      })
      .catch(err => {
        console.log("error here");
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.render("signup");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
      // console.log(req);
    }
  });

  app.get("/api/character_stats/:id", (req, res) => {
    db.Character.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(dbCharacterStats => res.json(dbCharacterStats));
  });
};
