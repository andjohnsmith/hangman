import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Input, Alert, Form, Button } from 'reactstrap';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    username: '',
    password: '',
    message: null,
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/list');
    }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
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

    const { username, password } = this.state;

    const user = {
      username,
      password,
    };

    this.props.loginUser(user);
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
                  <strong>Log In</strong>
                </h1>
                <p>Log into your Hangman account.</p>
                <Form>
                  {this.state.message && (
                    <Alert color="danger">{this.state.message}</Alert>
                  )}

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
                    Log In
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

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { loginUser })(Login);
