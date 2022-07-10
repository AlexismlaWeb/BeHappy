import React, { useState, useEffect } from "react";
import "./App.css";

import { Container, Col, Row } from "reactstrap";
import { Button } from "antd";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { AiOutlineHeart } from "react-icons/ai";

export default function ScreenRandom() {
  return (
    <Container fluid>
      <Row
        className="Top"
        style={{ fontSize: "16px", fontFamily: "Abril Fatface" }}
      >
        <Col md={{ span: 1, offset: 11 }}>
          <Link to="/screensigninup">
            <p style={{ color: "black" }}>MY ACOUNT</p>
          </Link>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "#FFDBD0" }}>
        <Col>
          <h3 className="Title">Title</h3>
        </Col>
        <Row>
          <Col>
            <p className="Text">details iehjefphiofopbj</p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <img src="..\daftpunk.png" alt="daft-punk" className="Img" />
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center">
          <Col
            sm={1}
            className="d-flex align-items-center justify-content-center"
          >
            <AiOutlineHeart style={{ fontSize: "40px" }} />
          </Col>
          <Col sm={2}>
            <p className="">IT MAKES ME HAPPY!</p>
            <p className="">ADD IT TO MY RECOMMENDATIONS</p>
          </Col>
        </Row>
      </Row>
      <Row>
        <Col xs="1" md="3" lg="4"></Col>
        <Col
          xs="10"
          md="6"
          lg="4"
          className="Bottom"
          style={{ margin: "20px" }}
        >
          <Button
            className="Button-Shadow"
            style={{
              boxShadow: "10px 10px #ffd2ee",
            }}
          >
            SURPRISE ME!
          </Button>
        </Col>
        <Col xs="1" md="3" lg="4" className="col3"></Col>
      </Row>
    </Container>
  );
}
