// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "challengr";

//locals is reachable from hbs views. 
/*
locals is reachable from hbs views.
app.locals is reachable everywhere 
while res.locals in the middleware only live for the duration of the request/response
*/
app.locals.appTitle = `Project ${capitalized(projectName)} by Ze !Dream Team`;

app.use(require("./middleware/setProfilePicture"));
app.use(require("./middleware/setLoginState"));

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const challengeRoutes = require("./routes/challenge.routes");
app.use("/challenge", challengeRoutes);

const gamesRoutes = require("./routes/games.routes");
app.use("/games", gamesRoutes);

const leaguesRoutes = require("./routes/leagues.routes");
app.use("/leagues", leaguesRoutes);

const boardsRoutes = require("./routes/boards.routes");
app.use("/boards", boardsRoutes);


const graphsRoutes = require("./routes/graphs.routes");
app.use("/graphs", graphsRoutes);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
