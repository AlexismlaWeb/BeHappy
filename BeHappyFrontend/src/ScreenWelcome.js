import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
export default function ScreenWelcome(props) {
  return (
    <Container
      fluid
      className="Welcome-page d-flex align-items-center justify-content-center"
    >
      <Row className="">
        <Col md={6} className="">
          <h1 className="text-right Tittle-Welcome">WELCOME TO HAPPY ME!</h1>
        </Col>
        <Col
          md={4}
          className="d-flex align-items-center justify-content-center"
        >
          <Link to="/screensearch">
            <GoArrowRight style={{ fontSize: "100px" }} />
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
