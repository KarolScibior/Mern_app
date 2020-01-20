import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { createMovie } from '../../actions/moviesActions';
import List from './list/List';
import { getMovies } from '../../actions/moviesActions';
import Preloader from '../layout/Preloader';

const Dashboard = (props) => {
  const { user } = props.auth;
  const [isHidden, setIsHidden] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { movies } = props;

  useEffect(() => {
    props.getMovies();
    // eslint-disable-next-line
  }, []);

  /* useEffect(() => {
    setIsHidden(!isHidden);
  }, [movies.movie]) */

  const validateMovie = (title, genre, year) => {
    if (title === '' || genre === '' || year === '') {
      setErrorMessage('There can be no empty spaces!');
      setIsError(true);
      return false;
    } else {
      if (!/^[a-zA-Z]{4,10}$/.test(genre)) {
        setErrorMessage('Genre is wrong!');
        setIsError(true);
        return false;
      };
      if (!/^\d{4}$/.test(year)) {
        setErrorMessage('Year is wrong!');
        setIsError(true);
        return false;
      }
      setIsError(false);
      return true;
    }
  };

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  const onSubmit = e => {
    const newMovie = {
      title: document.querySelector('#title').value,
      genre: document.querySelector('#genre').value,
      releaseYear: document.querySelector('#releaseYear').value
    };

    e.preventDefault();

    if (validateMovie(newMovie.title, newMovie.genre, newMovie.releaseYear)) {
      props.createMovie(newMovie);
      props.getMovies();
      setIsHidden(!isHidden);
      setIsError(false);
    }
  }

  return (
    <>
    {
      (movies.movieLoading || movies.moviesLoading) && <Preloader/>
    }
    <div className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Hey there,</b> {user.name.split(" ")[0]}
            <p className="flow-text grey-text text-darken-1">
              This is the list of your movies{" "}👏
            </p>
          </h4>
          <List/>
        </div>
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "3rem"
          }}
          onClick={() => setIsHidden(!isHidden)}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Add Movie
        </button>
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "3rem",
            float: "right"
          }}
          onClick={onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Logout
        </button>
        {
          isHidden && (
            <div
              style={{
                marginTop: '40px'
              }}
              className="col s12 center-align"
            >
              {
                isError && (
                  <h4 style={{ color: 'red', marginTop: '40px' }}>{errorMessage}</h4>
                )
              }
              <form noValidate onSubmit={onSubmit}>
                <div className="input-field col s12">
                  <input
                    id="title"
                    type="text"
                  />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="genre"
                    type="text"
                  />
                  <label htmlFor="genre">Genre</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="releaseYear"
                    type="text"
                  />
                  <label htmlFor="releaseYear">Release year</label>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )
        }
      </div>


    </div>
    </>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  createMovie: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  { logoutUser, createMovie, getMovies }
)(Dashboard);