import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteMovie, getMovies, updateMovie } from '../../../actions/moviesActions';

const ListItem = (props) => {
  const { id, title, genre, releaseYear } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    props.getMovies();
  });

  const onEdit = () => {
    setIsEditing(!isEditing);
    setTimeout(() => {
      document.querySelector('#title').value = title;
      document.querySelector('#genre').value = genre;
      document.querySelector('#releaseYear').value = releaseYear;
    }, 500);
  }

  const onDelete = () => {
    props.deleteMovie(id);
  }

  const onConfirm = () => {
    const updatedMovie = {
      _id: id,
      title: document.querySelector('#title').value,
      genre: document.querySelector('#genre').value,
      releaseYear: document.querySelector('#releaseYear').value
    };

    if (validateMovie(updatedMovie.title, updatedMovie.genre, updatedMovie.releaseYear)) {
      props.updateMovie(updatedMovie);
      setIsEditing(!isEditing);
    };
  }

  const validateMovie = (title, genre, year) => {
    if (title === '' || genre === '' || year === '') {
      setError('There can be no empty spaces!')
      return false;
    } else {
      if (!/^[a-zA-Z]{4,10}$/.test(genre)) {
        setError('Genre is wrong!');
        return false;
      };
      if (!/^\d{4}$/.test(year)) {
        setError('Year is wrong!')
        return false;
      }
      setError('');
      return true;
    }
  };

  return (
    <>
      {
        !isEditing && (
          <tr>
            <td>{title}</td>
            <td>{genre}</td>
            <td>{releaseYear}</td>
            <td>
              <button onClick={onEdit} className="btn btn-small waves-effect waves-light hoverable blue accent-3"><i className="material-icons left">edit</i>Edit</button>
            </td>
            <td>
              <button onClick={onDelete} className="btn btn-small waves-effect waves-light hoverable blue accent-3"><i className="material-icons left">delete</i>Delete</button>
            </td>
          </tr>
        )
      }
      {
        isEditing && (
          <tr>
            <td>
              <input
                id="title"
                type="text"
              />
            </td>
            <td>
              <input
                id="genre"
                type="text"
              />
            </td>
            <td>
              <input
                id="releaseYear"
                type="text"
              />
            </td>
            <td>
              <button onClick={onConfirm} className="btn btn-small waves-effect waves-light hoverable blue accent-3"><i className="material-icons left">done</i>Confirm</button>
            </td>
            <td style={{ color: 'red' }}>
              {error}
            </td>
          </tr>
        )
      }
    </>
  );
};

const mapStateToProps = state => ({

});

ListItem.propTypes = {
  deleteMovie: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  updateMovie: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { deleteMovie, getMovies, updateMovie })(ListItem);
