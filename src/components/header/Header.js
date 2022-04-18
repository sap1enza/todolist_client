import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare  } from '@fortawesome/free-regular-svg-icons'

import { Navbar, Container, Nav } from 'react-bootstrap';

import CreateProject from './../projects/CreateProject';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1><FontAwesomeIcon icon={faCheckSquare} /> To-Do App</h1>

        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <CreateProject />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
