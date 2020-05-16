const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index');
const eventRouter = require('./routes/event');
const authRouter = require('./routes/auth');

const app = express();

// config
const uri = 'mongodb+srv://test:test@cluster0-8egg7.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true })
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

// server.use((req,res,next)=>{ 
//   if(!req.body.jwt)
//       return res.redirect('/login');
//   next();    
// })

app.use('/', indexRouter);
app.use('/users', eventRouter);

app.use((err, req, res, next) => {
  console.log("eeeeeeeeeeeeeeeeeeeror");
  console.error(err);
  next();
});