import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteMovie } from '../../../actions/moviesActions';

const ListItem = (props) => {
  const { id, title, genre, releaseYear } = props;

  const onEdit = () => {
    console.log(id);
  }

  const onDelete = () => {
    props.deleteMovie(id);
  }

  return (
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
  );
};
const mapStateToProps = state => ({

});

ListItem.propTypes = {
  delteMovie: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { deleteMovie })(ListItem);
