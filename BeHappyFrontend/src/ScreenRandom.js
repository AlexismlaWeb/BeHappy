import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import { Container, Col, Row, Input, Label } from "reactstrap";
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
  const [filtre, setFiltre] = useState("All");
  const [allRecommendations, setAllRecommendations] = useState([]);
  const [recommendationsRandom, setRecommendationsRandom] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var heart;

  useEffect(() => {
    const getAllRecommendations = async () => {
      const data = await fetch("/getAllRecommendations");
      const body = await data.json();
      setAllRecommendations(body);
    };
    getAllRecommendations();
  }, []);

  useEffect(() => {
    const ConnectedorNot = () => {
      if (props.token) {
        setSignText("MY ACCOUNT");
      }
    };
    ConnectedorNot();
  }, [signText]);

  var bool = false;
  if (props.token) {
    var recommendations = [props.user];

    for (const item of recommendations) {
      if (item.recoList) {
        for (const item2 of item.recoList) {
          if (item2.APIid === recommendationsRandom.APIid) {
            console.log(
              "good => " + item2.title + " === " + recommendationsRandom.title
            );
            bool = true;
          }
        }
      }
    }
  }

  if (props.token) {
    if (bool) {
      heart = (
        <AiFillHeart
          style={{ fontSize: "30px" }}
          onClick={() => {
            console.log("liked =>", bool);
          }}
        />
      );
    } else {
      heart = (
        <AiOutlineHeart
          style={{ fontSize: "30px" }}
          onClick={() => {
            console.log("liked =>", bool);
          }}
        />
      );
    }
  } else {
    heart = (
      <AiOutlineHeart
        style={{ fontSize: "30px" }}
        onClick={() => {
          setShow(true);
        }}
      />
    );
  }

  //RECOMMENDATION FILTER

  const RecommendationsFilter = () => {
    const filteredRecommendations = allRecommendations.filter(
      (recommendation) => {
        if (filtre === "All") {
          return recommendation;
        } else {
          return recommendation.category.includes(filtre);
        }
      }
    );
    return filteredRecommendations;
  };

  const Recommendations = RecommendationsFilter();

  // RECOMMENDATION RANDOM
  const RecommendationRandom = () => {
    const randomRecommendation =
      Recommendations[Math.floor(Math.random() * Recommendations.length)];
    setRecommendationsRandom(randomRecommendation);
  };

  var Reco;

  return (
    <Container fluid>
      <HeaderComposant />
      <Row className="Text" style={{ marginTop: "5%" }}>
        <Col xs={3} md="6" lg="4">
          <Input
            type="radio"
            value="All"
            name="type"
            onChange={(e) => {
              setFiltre(e.target.value);
            }}
          />
          <Label style={{ fontSize: "10px" }}>ALL</Label>
        </Col>
        <Col xs={3} md="6" lg="4">
          <Input
            type="radio"
            value="Music"
            name="type"
            onChange={(e) => {
              setFiltre(e.target.value);
            }}
          />
          <Label style={{ fontSize: "10px" }}>MUSIC</Label>
        </Col>
        <Col xs={3} md="6" lg="4">
          <Input
            type="radio"
            value="Movie"
            name="type"
            onChange={(e) => {
              setFiltre(e.target.value);
            }}
          />
          <Label style={{ fontSize: "10px" }}>MOVIES</Label>
        </Col>
        <Col xs={3} md="6" lg="4">
          <Input
            type="radio"
            value="Serie"
            name="type"
            onChange={(e) => {
              setFiltre(e.target.value);
            }}
          />
          <Label style={{ fontSize: "10px" }}>SERIES</Label>
        </Col>
      </Row>
      <Row className="Text">
        <Col xs={4} md="6" lg="4">
          <Input
            type="radio"
            value="Book"
            name="type"
            onChange={(e) => {
              setFiltre(e.target.value);
            }}
          />
          <Label style={{ fontSize: "10px" }}>BOOKS</Label>
        </Col>
        <Col xs={4} md="6" lg="4">
          <Input
            type="radio"
            value="Podcast"
            name="type"
            onChange={(e) => {
              setFiltre(e.target.value);
            }}
          />
          <Label style={{ fontSize: "10px" }}>PODCASTS</Label>
        </Col>
        <Col xs={4} md="6" lg="4">
          <Input
            type="radio"
            value="Other"
            name="type"
            onChange={(e) => {
              setFiltre(e.target.value);
            }}
          />
          <Label style={{ fontSize: "10px" }}>OTHER</Label>
        </Col>
      </Row>

      <Row className="Text">
        <Col xs={12} md="6" lg="12">
          <Input
            type="radio"
            value="FollowedOnly"
            name="type"
            onChange={(e) => {
              setFiltre(e.target.value);
            }}
          />
          <Label style={{ fontSize: "10px" }}>FROM FOLLOWED ONLY</Label>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md="6" lg={{ span: 6, offset: 3 }} className="Bottom">
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
      {recommendationsRandom.category
        ? (Reco = (
            <Row
              style={{
                backgroundColor: "#FFDBD0",
                marginTop: "3%",
                paddingTop: "3%",
                paddingBottom: "3%",
              }}
            >
              <Row style={{ marginBottom: "3%" }}>
                <Col xs={12} md={6} lg={12}>
                  <h3 className="Title">{recommendationsRandom.title}</h3>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={12}
                  md={6}
                  lg={12}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img
                    src={recommendationsRandom.imageUrl}
                    alt={recommendationsRandom.title}
                    className="Img"
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "10%" }}>
                <Col xs={2} md={6} lg={12}></Col>
                <Col
                  xs={2}
                  md={6}
                  lg={8}
                  className=" d-flex justify-content-center"
                >
                  {heart}
                </Col>
                <Col xs={7} md={6} lg={4} style={{ textAlign: "left" }}>
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
          ))
        : null}
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
              RecommendationRandom();
            }}
          >
            SURPRISE ME!
          </Button>
        </Col>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <ScreenSignInUp />
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
}

function mapStateToProps(state) {
  return { token: state.token, user: state.user };
}

export default connect(mapStateToProps, null)(ScreenRandom);
