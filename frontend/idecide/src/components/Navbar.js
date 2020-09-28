import React, { Component, useState } from "react";
import { MDBBtn, MDBFormInline, MDBCol } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../CSS/navbar.css";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, Modal, Button } from "react-bootstrap";
import PrimaryButton from "./reusableComponents/PrimaryButton";
import { NavLink } from "react-router-dom";

import IconLogo from "../images/idecide-logo.png";

const NavbarID = ({ className, ...rest }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <Navbar bg="light" expand="lg">
        <NavLink to="/">
          <Navbar.Brand>
            <img
              src={IconLogo}
              alt="IconLogo"
              style={{ height: 40, marginTop: 10 }}
            />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">
            <NavLink className="navbar navbar-dark home" to="/">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-house-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                />
              </svg>
              Home
            </NavLink>
            {/* <Nav.Link className="navbar navbar-dark contact" href="/1">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-flower3"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.424 8c.437-.052.811-.136 1.04-.268a2 2 0 0 0-2-3.464c-.229.132-.489.414-.752.767C9.886 4.63 10 4.264 10 4a2 2 0 1 0-4 0c0 .264.114.63.288 1.035-.263-.353-.523-.635-.752-.767a2 2 0 0 0-2 3.464c.229.132.603.216 1.04.268-.437.052-.811.136-1.04.268a2 2 0 1 0 2 3.464c.229-.132.489-.414.752-.767C6.114 11.37 6 11.736 6 12a2 2 0 1 0 4 0c0-.264-.114-.63-.288-1.035.263.353.523.635.752.767a2 2 0 1 0 2-3.464c-.229-.132-.603-.216-1.04-.268zM9 4a1 1 0 0 0-2 0 1.473 1.473 0 0 0 .045.206c.039.131.1.294.183.483.166.378.396.808.637 1.223l.135.23.135-.23c.241-.415.47-.845.637-1.223.083-.19.144-.352.183-.484.02-.065.031-.116.038-.154C9 4.018 9 4.002 9 4zM3.67 5.5a1 1 0 0 0 .366 1.366 1.47 1.47 0 0 0 .2.064c.134.032.305.06.51.083.411.045.898.061 1.379.06.09 0 .178 0 .266-.002a21.82 21.82 0 0 0-.131-.232 12.88 12.88 0 0 0-.742-1.163 4.215 4.215 0 0 0-.327-.4 1.472 1.472 0 0 0-.115-.11c-.025-.022-.038-.03-.04-.032A1 1 0 0 0 3.67 5.5zm1.366 5.366a1 1 0 0 1-1-1.732c.001 0 .016-.008.047-.02.037-.013.087-.028.153-.044.134-.032.305-.06.51-.083a12.88 12.88 0 0 1 1.379-.06c.09 0 .178 0 .266.002a21.82 21.82 0 0 1-.131.232c-.24.416-.497.83-.742 1.163a4.1 4.1 0 0 1-.327.4 1.483 1.483 0 0 1-.155.142zM9 12a1 1 0 0 1-2 0 1.476 1.476 0 0 1 .045-.206c.039-.131.1-.294.183-.483.166-.378.396-.808.637-1.223L8 9.858l.135.23c.241.415.47.845.637 1.223.083.19.144.352.183.484A1.338 1.338 0 0 1 9 12zm3.33-6.5a1 1 0 0 1-.366 1.366 1.478 1.478 0 0 1-.2.064c-.134.032-.305.06-.51.083-.412.045-.898.061-1.379.06-.09 0-.178 0-.266-.002l.131-.232c.24-.416.497-.83.742-1.163a4.1 4.1 0 0 1 .327-.4c.046-.05.085-.086.114-.11.026-.022.04-.03.041-.032a1 1 0 0 1 1.366.366zm-1.366 5.366a1 1 0 0 0 1-1.732c-.002 0-.016-.008-.047-.02a1.478 1.478 0 0 0-.153-.044 4.217 4.217 0 0 0-.51-.083 12.881 12.881 0 0 0-1.379-.06c-.09 0-.178 0-.266.002a22 22 0 0 0 .131.232c.24.416.497.83.742 1.163.122.167.232.3.327.4a1.494 1.494 0 0 0 .155.142zM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                />
              </svg>
              Contact
            </Nav.Link> */}
            <NavDropdown
              className="navbar navbar-dark dropdown"
              title="Menu"
              id="basic-nav-dropdown"
            >
              <div className="dropitem">
                <NavDropdown.Item href="/survey/3.1">
                  <div className="ques">
                    <svg
                      width="2em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-file-earmark-text"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                      <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
                      <path
                        fillRule="evenodd"
                        d="M5 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                    Questions
                  </div>
                </NavDropdown.Item>

                <NavDropdown.Item href="/survey/3.2">
                  <svg
                    width="2em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-bar-chart-steps"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0z"
                    />
                    <rect width="5" height="2" x="2" y="1" rx=".5" />
                    <rect width="8" height="2" x="4" y="5" rx=".5" />
                    <path d="M6 9.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z" />
                  </svg>
                  Action Plan
                </NavDropdown.Item>

                <NavDropdown.Item href="/survey/3.3">
                  <svg
                    width="2em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-layout-sidebar"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"
                    />
                    <path fillRule="evenodd" d="M4 14V2h1v12H4z" />
                  </svg>
                  Framework
                </NavDropdown.Item>
                <NavDropdown.Divider />

                {(localStorage.getItem("userType") === "admin") ?
                  <NavDropdown.Item href="/dashboard">
                    <svg
                      width="2em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-layout-text-window-reverse"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M5 15V4H4v11h1zM.5 4h15V3H.5v1zM13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
                      />
                    </svg>
                  Dashboard
                </NavDropdown.Item>
                  : null}


              </div>
            </NavDropdown>
          </Nav>
          <h6>{localStorage.getItem("userType")}</h6>
          <Form inline>
            <MDBCol md="12">
              {/* <MDBFormInline className="md-form mr-auto mb-4"> */}
              <PrimaryButton
                gradient="purple-gradient"
                rounded
                className="purple-gradient"
                onClick={() => handleShow()}
              >
                Get Help
              </PrimaryButton>
              <PrimaryButton
                gradient="purple-gradient"
                rounded
                className="purple-gradient"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "https://www.weather.com.au/";
                }}
              >
                Quick Exit
              </PrimaryButton>
              {/* </MDBFormInline> */}
            </MDBCol>
          </Form>
        </Navbar.Collapse>

      </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="lg"
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 style={{ color: "purple" }}>
              If you’re looking for help, you can call:
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "5%" }}>
          <h5>
            {" "}
            > 1800 RESPECT -- <a href={`tel:1800 737 732`}>1800 737 732</a>
          </h5>
          <h5>
            {" "}
            > Lifeline -- <a href={`tel:13 11 14`}>13 11 14</a>
          </h5>
          <h5>
            {" "}
            > Sexual Assault Crisis Line --{" "}
            <a href={`tel:1800 737 732`}>1800 806 292</a>
          </h5>
          <h5>
            {" "}
            > QLife -- <a href={`tel:1800 184 627`}>1800 184 627</a>
          </h5>
          <h5>
            {" "}
            > InTouch Multicultural Centre Against Family Violence --{" "}
            <a href={`tel:1800 737 732`}>1800 755 988</a>
          </h5>
          <h5>
            {" "}
            > Safer Community Program --{" "}
            <a href={`tel:1800 737 732`}>61 3 9035 8675</a>
            <Nav.Link href="https://safercommunity.unimelb.edu.au/">
              safercommunity.unimelb.edu.au
            </Nav.Link>
          </h5>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NavbarID;
