require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
).then((data)=>{
  console.log("connected");
})
.catch((err)=>{
  console.log("errors "+err);
});

server.use(express.json());
server.use(express.urlencoded({extended:false}));


/* routers */
app.use(authRouter);

// server.use((req,res,next)=>{ 
//   if(!req.body.jwt)
//       return res.redirect('/login');
//   next();    
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});