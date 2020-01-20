import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import keys from './config/keys';
import User from './config/models/User';
import passport from 'passport';
import passportHelper from './config/passport';
import users from './api/users';
import movies from './api/movies';

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


const db = keys.mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
passportHelper(passport);
app.use('/api/users', users);
app.use('/api/movies', movies);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));