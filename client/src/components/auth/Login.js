import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Input, Form, Button } from 'reactstrap';
import { loginUser } from '../../actions/authActions';

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/games" />;
  }

  return (
    <div className="home-slider">
      <div className="slider-item">
        <div className="overlay"></div>
        <Container>
          <div className="row slider-text align-items-center justify-content-center">
            <div className="col-md-10 text-center">
              <h1 className="mb-4">
                <strong>Log In</strong>
              </h1>
              <p>Log into your Hangman account.</p>
              <Form>
                <Input
                  placeholder="Username"
                  name="username"
                  type="text"
                  className="credentials"
                  onChange={onChange}
                />

                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="credentials"
                  onChange={onChange}
                />

                <Button
                  onClick={onSubmit}
                  className="btn btn-primary btn-outline-white px-4 py-3"
                >
                  Log In
                </Button>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
