import React from 'react';
import ListItem from './ListItem';

const List = () => {
  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Release year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <ListItem title="Movie" genre="Thriller" releaseYear="2018"/>
      </tbody>
    </table>
  );
};

export default List;