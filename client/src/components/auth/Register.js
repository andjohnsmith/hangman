import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Form, Input, Alert, Button } from 'reactstrap';
import { register } from '../../actions/authActions';

class Register extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    message: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ message: error.msg.message });
      } else {
        this.setState({ message: null });
      }
    }

    if (this.props.isAuthenticated) {
      this.props.history.push('/list');
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, username, password } = this.state;
    const newUser = { name, username, password };
    this.props.register(newUser);
  };

  render() {
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
                  {this.state.message && (
                    <Alert color="danger">{this.state.message}</Alert>
                  )}
                  <Input
                    placeholder="Name"
                    name="name"
                    type="text"
                    className="credentials"
                    onChange={this.onChange}
                  />

                  <Input
                    placeholder="Username"
                    name="username"
                    type="text"
                    className="credentials"
                    onChange={this.onChange}
                  />

                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    className="credentials"
                    onChange={this.onChange}
                  />

                  <Button
                    onClick={this.onSubmit}
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
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register })(Register);
