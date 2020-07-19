import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

import IconLogo from "../images/idecide-logo.png";

class Landing extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img
            src={IconLogo}
            alt="IconLogo"
            style={{ height: 40, marginTop: 10 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/1">NotFound</Nav.Link>
            <NavDropdown title="Survey" id="basic-nav-dropdown">
              <NavDropdown.Item href="/survey/3.1">Questions</NavDropdown.Item>
              <NavDropdown.Item href="/survey/3.2">
                Action Plan
              </NavDropdown.Item>
              <NavDropdown.Item href="/survey/3.3">Framework</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/survey/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Landing);
