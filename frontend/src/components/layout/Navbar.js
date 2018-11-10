import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Fa
} from "mdbreact";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class NavbarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <NavbarNav right>
        <NavItem>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/create-Article" style={{ background: "lightseagreen" }}>
            <Fa icon="pencil" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="#" onClick={this.onLogoutClick.bind(this)}>
            {" "}
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />{" "}
            Logout
          </NavLink>
        </NavItem>
      </NavbarNav>
    );

    const guestLinks = (
      <NavbarNav right>
        <NavItem>
          <NavLink to="/register">Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/login">Login</NavLink>
        </NavItem>
      </NavbarNav>
    );

    return (
      <Navbar color="indigo" dark expand="md" scrolling fixed="top">
        <Container>
          <NavbarBrand href="/">
            <strong>1infinitycOrp</strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.onClick} />

          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem active>
                <NavLink to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Education</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Travel</NavLink>
              </NavItem>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    More
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="#">Action</DropdownItem>
                    <DropdownItem href="#">Another Action</DropdownItem>
                    <DropdownItem href="#">Something else here</DropdownItem>
                    <DropdownItem href="#">Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            </NavbarNav>
            {isAuthenticated ? authLinks : guestLinks}
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

NavbarView.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(NavbarView);
