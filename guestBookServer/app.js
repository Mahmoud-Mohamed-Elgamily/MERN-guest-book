const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const eventRouter = require('./routes/event');
const authRouter = require('./routes/auth');
const replyRouter = require('./routes/reply');

const app = express();

// config
const uri = 'mongodb+srv://test:test@cluster0-8egg7.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((data) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("errors " + err);
  });

port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// libraries
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* routers */
app.use(authRouter);

app.use((req, res, next) => {
  if (!req.body.token) {
    return res.send('not logged');
  }
  const tokenVerification = authRouter.auth(req.body.token);
  if (tokenVerification) {
    req.body.userId = tokenVerification.id;
    next();
  }else{
    return res.status(401).send("wrong token")
  }
})

app.use('/event', eventRouter);
app.use('/reply', replyRouter);

app.use((err, req, res, next) => {
  console.log("********************************* error *********************************");
  console.error(err);
  next();
});