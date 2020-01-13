import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = (props) => {
  const { movies } = props;

  //console.log(movies.movies);


  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Release year</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          movies.movies.map((movie, index) => {
            return <ListItem id= {movie._id} key={index} title={movie.title} genre={movie.genre} releaseYear={movie.releaseYear}/>
          })
        }
      </tbody>
    </table>
  );
};

List.propTypes = {
  movies: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(List);