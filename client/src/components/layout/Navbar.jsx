import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


const Navbar = (props) => {
  const { isAuthenticated } = props.auth;
  console.log(isAuthenticated);
  return (
    <div className="navbar-fixed">
      <nav className="z-depth-0">
        <div className="nav-wrapper white">
          {
            !isAuthenticated && (
              <Link
                to="/"
                style={{
                  fontFamily: "Montserrat"
                }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons">code</i>
                Karol Ścibior
              </Link>
            )
          }
          {
            isAuthenticated && (
              <Link
                to="/dashboard"
                style={{
                  fontFamily: "Montserrat"
                }}
                className="col s5 brand-logo center black-text"
              >
                <i className="material-icons">code</i>
                Karol Ścibior
              </Link>
            )
          }
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Navbar);