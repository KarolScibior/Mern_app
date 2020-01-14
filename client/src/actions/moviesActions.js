import axios from 'axios';

import {
  CREATE_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE,
  GET_MOVIE,
  MOVIE_LOADING,
  GET_MOVIES,
  MOVIES_LOADING
} from './types';

//create movie
export const createMovie = movieData => dispatch => {
  axios.post('/api/movies/create', movieData)
    .then(res => dispatch({
      type: CREATE_MOVIE,
      payload: res.data
    }))
    .catch(err => console.log(err));
};

//update movie
export const updateMovie = movieData => dispatch => {
  axios.patch('/api/movies/update', movieData)
    .then(res => dispatch({
      type: UPDATE_MOVIE,
      payload: res.data
    }))
    .catch(err => console.log(err));
};

//delete movie
export const deleteMovie = id => dispatch => {
  axios.delete(`/api/movies/delete/${id}`)
    .then(res => dispatch({
      type: DELETE_MOVIE,
      payload: id
    }))
    .catch(err => console.log(err));
};

//get movie by id
export const getMovie = id => dispatch => {
  dispatch(setMovieLoading());
  axios.get(`/api/movies/${id}`)
    .then(res => dispatch({
      type: GET_MOVIE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_MOVIE,
      payload: null
    }));
};

//get all movies for user
export const getMovies = () => dispatch => {
  console.log('e');
  dispatch(setMoviesLoading());
  axios.get('/api/movies/')
    .then(res => dispatch({
      type: GET_MOVIES,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_MOVIES,
      payload: null
    }));
};

//movie loading
export const setMovieLoading = () => {
  return {
    type: MOVIE_LOADING
  };
};

//movies loading
export const setMoviesLoading = () => {
  return {
    type: MOVIES_LOADING
  };
};
