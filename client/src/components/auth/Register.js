import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Input, Alert } from 'reactstrap';
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
      <div className="register">
        <Container>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Hangman account</p>
              {this.state.message && (
                <Alert color="danger">{this.state.message}</Alert>
              )}
              <form onSubmit={this.onSubmit}>
                <Input
                  placeholder="Name"
                  name="name"
                  type="text"
                  onChange={this.onChange}
                />

                <Input
                  placeholder="Username"
                  name="username"
                  type="text"
                  onChange={this.onChange}
                />

                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={this.onChange}
                />

                <Input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </Container>
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
