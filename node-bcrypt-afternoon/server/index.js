require("dotenv").config();
const express = require("express"),
      session = require("express-session"),
      massive = require("massive"),
      { CONNECTION_STRING, SESSION_SECRET } = process.env,
      app = express(),
      authCtrl = require("../server/controllers/authController");

const PORT = 4000;

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("DB connected");
});
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
    // cookie: {maxAge: 1000 * 60}
  })
);


app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);



app.listen(PORT, () => console.log(`Server is ready on ${PORT}`));