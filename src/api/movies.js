import express from 'express';
import passport from 'passport';
import keys from '../config/keys';
import Movie from '../config/models/Movie';

const router = express.Router();

//get all movies
router.get('/', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let moviesArr = [];

    const owner = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    await Movie.find({ owner: owner })
      .then(movies => {
        movies.map(movie => {
          if (owner.email == req.user.email) {
            moviesArr.push(movie);
          }
        });
        res.json(moviesArr);
      })
      .catch(err => console.log(err));
  }
);

//get movie by id
router.get('/:id', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const id = req.params.id;

    await Movie.findById(id)
      .then(movie => res.json(movie))
      .catch(err => console.log(err));
  }
);

//add new movie
router.post('/create', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const owner = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const newMovie = await new Movie({
      title: req.body.title,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      owner: owner
    });

    await newMovie.save()
      .then(movie => res.json(movie))
      .catch(err => console.log(err));
  }
);

//update existing movie
router.patch('/update', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const movieFields = {
      title: req.body.title,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear
    };

    await Movie.findOneAndUpdate(
      { _id: req.body._id },
      { $set: movieFields },
      { new: true }
    )
      .then(movie => {
        res.json(movie);
      })
      .catch(err => console.log(err));
  }
);

//delete existing movie
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    Movie.findById(req.params.id)
      .then(movie => {
        movie.remove()
          .then(() => res.json({ success: true }));
      });
  }
);

export default router;
