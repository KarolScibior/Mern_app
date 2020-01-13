import {
  CREATE_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE,
  GET_MOVIE,
  MOVIE_LOADING,
  GET_MOVIES,
  MOVIES_LOADING
} from '../actions/types';

const initialState = {
  movies: [],
  movie: [],
  movieLoading: false,
  moviesLoading: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case CREATE_MOVIE:
      return {
        ...state,
        movies: [action.payload, ...state.movies]
      };
    case UPDATE_MOVIE:
      let index = state.movies.findIndex(
        movie => movie._id === action.payload._id
      );

      state.movies.splice(index, 1);

      return {
        ...state,
        movies: [action.payload, ...state.movies]
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(
          movie => movie._id !== action.payload
        )
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        movieLoading: false
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        moviesLoading: false
      };
    case MOVIE_LOADING:
      return {
        ...state,
        movieLoading: true
      };
    case MOVIES_LOADING:
      return {
        ...state,
        moviesLoading: true
      };
    default:
      return state;
  }
}