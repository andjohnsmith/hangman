import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Form, Input, Alert, Button } from 'reactstrap';
import { register } from '../../actions/authActions';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const { name, username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    register({ name, username, password });
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
                <strong>Register</strong>
              </h1>
              <p>Create your Hangman account.</p>
              <Form>
                <Input
                  placeholder="Name"
                  name="name"
                  type="text"
                  className="credentials"
                  onChange={onChange}
                />

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
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
