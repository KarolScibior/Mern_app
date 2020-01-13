import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { createMovie } from '../../actions/moviesActions';
import List from './list/List';
import { getMovies } from '../../actions/moviesActions';


const Dashboard = (props) => {
  const { user } = props.auth;
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    props.getMovies();
  })

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


    props.createMovie(newMovie);
    setIsHidden(!isHidden);
  }

  return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
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
                marginTop: '80px'
              }}
              className="col s12 center-align"
            >
              <form noValidate onSubmit={onSubmit}>
                <div className="input-field col s12">
                  <input
                    //onChange={this.onChange}
                    //value={this.state.name}
                    //error={errors.name}
                    id="title"
                    type="text"
                    //className={classnames("", {
                    // invalid: errors.name
                    //})}
                  />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="input-field col s12">
                  <input
                    //onChange={this.onChange}
                    //value={this.state.email}
                    //error={errors.email}
                    id="genre"
                    type="text"
                    //className={classnames("", {
                    //  invalid: errors.email
                    //})}
                  />
                  <label htmlFor="genre">Genre</label>
                </div>
                <div className="input-field col s12">
                  <input
                    //onChange={this.onChange}
                    //value={this.state.password}
                    //error={errors.password}
                    id="releaseYear"
                    type="text"
                    //className={classnames("", {
                    //  invalid: errors.password
                    //})}
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
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  createMovie: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, createMovie, getMovies }
)(Dashboard);