import "./App.css";
import React, { useState, useEffect } from "react";

import { Container, Col, Row, Input } from "reactstrap";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ScreenSignInUp from "./ScreenSignInUp";

function HeaderComposant(props) {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [signText, setSignText] = useState("SIGN IN");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const ConnectedorNot = () => {
      if (props.token) {
        setSignText("MY ACCOUNT");
      }
    };
    ConnectedorNot();
  }, [signText]);

  const RedirectToMyProfile = () => {
    if (props.token) {
      history.push("/screenprofile");
    } else {
      setShow(true);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs="12" md="12" lg="12" className="Myaccount-Box">
          {props.token ? (
            <img src="../AvatarTest.png" className="Avatar" />
          ) : null}
          <p
            className="Myaccount-Link"
            onClick={() => {
              RedirectToMyProfile();
            }}
          >
            {signText}
          </p>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ScreenSignInUp />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(HeaderComposant);
