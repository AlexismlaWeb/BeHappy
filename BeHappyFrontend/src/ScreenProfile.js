import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";

function ScreenProfile(props) {
  const history = useHistory();

  const navigateScreenrandom = () => {
    let path = `/screenrandom`;
    history.push(path);
  };
  if (props.token) {
    return (
      <Container fluid>
        <Row>
          <Col xs="1" md="3" lg="4"></Col>
          <Col xs="10" md="6" lg="4" className="Editmyprofile-Box">
            <img src="../AvatarTest.png" className="Avatar" />
            <Button
              className="Button-Shadow"
              style={{ boxShadow: "5px 5px #D7E8DA", height: "20px" }}
            >
              EDIT MY PROFILE
            </Button>
          </Col>
          <Col xs="1" md="3" lg="4"></Col>
        </Row>
        <Row>
          <Col xs="1" md="3" lg="4"></Col>
          <Col xs="10" md="6" lg="4">
            <p className="User-Pseudo" style={{ textAlign: "center" }}>
              @JoeyPasta
            </p>
            <div className="User-Stats">
              <p className="Text2"> 12 RECO</p>
              <p className="Text2"> 15 FOLLOWERS</p>
              <p className="Text2"> 18 FOLLOWING</p>
            </div>
          </Col>
          <Col xs="1" md="3" lg="4"></Col>
        </Row>
        <Row style={{ backgroundColor: "#D7E8DA" }} className="Main-Row">
          <Col xs="1" md="3" lg="4"></Col>
          <Col
            xs="10"
            md="6"
            lg="4"
            style={{ height: "420px", overflowY: "auto" }}
          >
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
            <div className="List">
              <div className="List">
                <img src="../AvatarTest.png" className="Reco-Image" />
                <div className="Reco-Infos">
                  <p className="Reco">CATEGORY</p>
                  <p className="Reco">Title</p>
                  <p className="Reco">Likes</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faXmarkCircle} className="Right-Icon" />
            </div>
          </Col>
          <Col xs="1" md="3" lg="4"></Col>
        </Row>
        <Row>
          <Col xs="1" md="3" lg="4"></Col>
          <Col xs="10" md="6" lg="4" className="Bottom">
            <Button
              className="Button-Shadow"
              style={{ boxShadow: "10px 10px #D7E8DA" }}
              onClick={() => {
                console.log("clicked");
                history.push("/screensearchreco");
              }}
            >
              UPDATE MY LIST
            </Button>
            <Button
              danger
              className="Button-Shadow"
              style={{ boxShadow: "10px 10px #D7E8DA" }}
              onClick={() => {
                navigateScreenrandom();
                console.log("clicked");
              }}
            >
              SURPRISE ME
            </Button>
          </Col>
          <Col xs="1" md="3" lg="4" className="col3"></Col>
        </Row>
        <Row>
          <Col xs="1" md="3" lg="4"></Col>
          <Col xs="10" md="6" lg="4" className="Bottom">
            <Button
              style={{
                backgroundColor: "white",
                color: "red",
                borderColor: "red",
                boxShadow: "10px 10px #ffd2ee",
              }}
              className="Button-Shadow"
              onClick={() => {
                console.log("clicked");
                props.addToken();
                history.push("/screenrandom");
              }}
            >
              LOG-OUT
            </Button>
          </Col>
          <Col xs="1" md="3" lg="4" className="col3"></Col>
        </Row>
      </Container>
    );
  } else {
    return <Redirect to="/screenrandom" />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function () {
      dispatch({ type: "log-out" });
    },
  };
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenProfile);
