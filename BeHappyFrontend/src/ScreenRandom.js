import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import { Container, Col, Row, Input } from "reactstrap";
import { Button } from "antd";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { AiOutlineHeart } from "react-icons/ai";
import ScreenSignInUp from "./ScreenSignInUp";

export default function ScreenRandom() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      <Row>
        <Row>
          <Col xs="12" md="6" lg="4" className="Myaccount-Box">
            <img src="../AvatarTest.png" className="Avatar" alt="avatar" />
            <Link className="Myaccount-Link">MY ACCOUNT</Link>
          </Col>
        </Row>
        <Row className="Text" style={{ marginTop: "5%" }}>
          <Col xs={4} md="6" lg="4">
            <input type="radio" value="Music" name="type" /> MUSIC
          </Col>
          <Col xs={4} md="6" lg="4">
            <input type="radio" value="Movies" name="type" /> MOVIES
          </Col>
          <Col xs={4} md="6" lg="4">
            <input type="radio" value="Series" name="type" /> SERIES
          </Col>
        </Row>
        <Row className="Text">
          <Col xs={4} md="6" lg="4">
            <input type="radio" value="Books" name="type" /> BOOKS
          </Col>
          <Col xs={4} md="6" lg="4">
            <input type="radio" value="Podcasts" name="type" /> PODCASTS
          </Col>
          <Col xs={4} md="6" lg="4">
            <input type="radio" value="Other" name="type" /> OTHER
          </Col>
        </Row>

        <Row className="Text">
          <Col xs={12} md="6" lg="4">
            <input type="radio" value="FollowedOnly" name="type" /> FROM
            FOLLOWED LIST ONLY
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6" lg="4" className="Bottom">
            <Button
              className="Button-Shadow"
              style={{
                boxShadow: "10px 10px #ffd2ee",
                width: "50%",
                height: "70%",
              }}
            >
              UPDATE MY HAPPY LIST
            </Button>
            <Button
              className="Button-Shadow"
              style={{
                boxShadow: "10px 10px #ffd2ee",
                width: "50%",
                height: "70%",
              }}
            >
              EXPLORE OTHER HAPPY LIST
            </Button>
          </Col>
        </Row>
      </Row>

      <Row
        style={{
          backgroundColor: "#FFDBD0",
          marginTop: "2%",
          paddingTop: "5%",
          paddingBottom: "5%",
        }}
      >
        <Col xs={12} md={6} lg={4} style={{ marginTop: "1%" }}>
          <h3 className="Title">GET LUCKY</h3>
        </Col>
        <Row>
          <Col xs={12} sm={6} md={6} lg={4} style={{ marginBottom: "5%" }}>
            <p className="Text">Daft Punck, Pharrell Williams, Nile Rodgers</p>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 8, offset: 2 }}
            md={6}
            lg={4}
            style={{ marginBottom: "5%" }}
          >
            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <ScreenSignInUp />
              </Modal.Body>
            </Modal>
            <img src="..\daftpunk.png" alt="daft-punk" className="Img" />
          </Col>
        </Row>
        <Row>
          <Col
            xs={4}
            sm={6}
            md={6}
            lg={4}
            className="d-flex justify-content-center"
          >
            <AiOutlineHeart style={{ fontSize: "40px" }} />
          </Col>
          <Col xs={8} sm={6} md={6} lg={4} style={{ textAlign: "left" }}>
            <p
              style={{
                fontFamily: "Fredoka One ",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              IT MAKES ME HAPPY! ADD IT TO MY RECOMMENDATIONS
            </p>
          </Col>
        </Row>
      </Row>
      <Row>
        <Col xs="10" md="6" lg="4" className="Bottom" style={{ margin: "10%" }}>
          <Button
            className="Button-Shadow"
            style={{
              boxShadow: "10px 10px #ffd2ee",
              width: "100%",
              height: "100%",
              fontSize: "20px",
            }}
            onClick={() => {
              handleShow();
              console.log("clicked");
            }}
          >
            SURPRISE ME!
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
