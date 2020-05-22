import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  logout = () => {
    this.props.logoutUser();
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar color="dark" dark expand="sm" className="ftco-navbar-light">
          <Container>
            <NavbarBrand href="/list">Hangman</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/list">My Games</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/" onClick={this.logout}>
                    Logout
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}

AppNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(AppNavbar);
