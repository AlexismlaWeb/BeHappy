import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import { Container, Col, Row, Input } from "reactstrap";
import { Button } from "antd";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import ScreenSignInUp from "./ScreenSignInUp";
import HeaderComposant from "./HeaderComposant";

function ScreenRandom(props) {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [signText, setSignText] = useState("SIGN IN");
  const [liked, setLiked] = useState(false);

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
      console.log("not logged in");
      setShow(true);
    }
  };

  if (props.token) {
    console.log("token: ", props.token);
  } else {
    console.log("no token");
  }

  var ok;

  if (props.token) {
    if (liked) {
      ok = (
        <AiFillHeart
          style={{ fontSize: "40px" }}
          onClick={() => {
            setLiked(false);
          }}
        />
      );
    } else {
      ok = (
        <AiOutlineHeart
          style={{ fontSize: "40px" }}
          onClick={() => {
            setLiked(true);
            console.log("liked");
          }}
        />
      );
    }
  } else {
    ok = (
      <AiOutlineHeart
        style={{ fontSize: "40px" }}
        onClick={() => {
          setShow(true);
        }}
      />
    );
  }

  return (
    <Container fluid>
      <Row>
        <HeaderComposant />

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
          <Col xs={12} md="6" lg="12">
            <input type="radio" value="FollowedOnly" name="type" /> FROM
            FOLLOWED LIST ONLY
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6" lg={{ span: 6, offset: 3 }} className="Bottom">
            <Button
              className="Button-Shadow"
              style={{
                boxShadow: "10px 10px #ffd2ee",
                width: "50%",
                height: "70%",
              }}
              onClick={() => {
                handleShow();
                if (props.token) {
                  history.push("/screensearchreco");
                } else {
                  setShow(true);
                }
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
              onClick={() => {
                handleShow();
                if (props.token) {
                  history.push("/screensearchuser");
                } else {
                  setShow(true);
                }
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
        <Col xs={12} md={6} lg={12} style={{ marginTop: "1%" }}>
          <h3 className="Title">GET LUCKY</h3>
        </Col>
        <Row>
          <Col xs={12} sm={6} md={6} lg={12} style={{ marginBottom: "5%" }}>
            <p className="Text">Daft Punck, Pharrell Williams, Nile Rodgers</p>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 8, offset: 2 }}
            md={6}
            lg={{ span: 4, offset: 4 }}
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
            lg={8}
            className="d-flex justify-content-center"
          >
            {ok}
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
        <Col
          xs="10"
          md="6"
          lg={10}
          className="Bottom"
          style={{ margin: "10%" }}
        >
          <Button
            className="Button-Shadow"
            style={{
              boxShadow: "10px 10px #ffd2ee",
              width: "100%",
              height: "100%",
              fontSize: "20px",
            }}
            onClick={() => {
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

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ScreenRandom);
