import React from 'react';

const ListItem = (props) => {
  const { title, genre, releaseYear } = props;
  return (
    <tr>
      <td>{title}</td>
      <td>{genre}</td>
      <td>{releaseYear}</td>
      <td>edit/delete</td>
    </tr>
  );
};

export default ListItem;
