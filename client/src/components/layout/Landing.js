import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/list');
    }
  }

  render() {
    return (
      <div className="home-slider">
        <div className="slider-item">
          <div className="overlay"></div>
          <div className="container">
            <div className="row slider-text align-items-center justify-content-center">
              <div className="col-md-10 text-center">
                <h1 className="mb-4">
                  <strong>Hangman</strong>
                </h1>
                <p>Create an account and guess some words.</p>
                <Link
                  to="/register"
                  className="btn btn-primary btn-outline-white px-4 py-3 mr-3"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="btn btn-primary btn-outline-white px-4 py-3"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
