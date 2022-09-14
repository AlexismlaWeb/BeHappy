import "./App.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import { Container, Col, Row, Input, Label, NavItem } from "reactstrap";
import { Button } from "antd";
import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineHeart, AiFillHeart, AiTwotonePicture } from "react-icons/ai";
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
  const [randomReco, setRandomReco] = useState({});
  const [userReco, setUserReco] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let heart;

  // ON INITIALISATION
  useEffect(() => {
    // GET ALL RECO FROM DATABASE
    const getAllRecommendations = async () => {
      const data = await fetch("/getAllRecommendations");
      const body = await data.json();
      if (body) {
        for (let i = 0; i < body.length; i++) {
          if (
            (body[i].imageUrl.includes("null") &&
              body[i].category === "Movie") ||
            body[i].category === "Film"
          ) {
            body[i].imageUrl = "../movie.jpg";
          } else if (
            body[i].imageUrl.includes("null") &&
            body[i].category === "Serie"
          ) {
            body[i].imageUrl = "../series.png";
          }
        }
      }
      console.log("body", body);
      setAllRecommendations(body);
    };
    getAllRecommendations();
  }, []);

  // IF CONNECTED...
  useEffect(() => {
    const getUserInfo = async () => {
      console.log(props.token);
      // CHANGE THE LINK TO "MY ACCOUNT"
      if (props.token) {
        setSignText("MY ACCOUNT");

        // GET USER INFO FROM DATABASE
        const data = await fetch("/getUserInfoByToken/" + props.token);
        const body = await data.json();

        // CREATE USER LIST OF RECO IDS
        let userList = [];
        for (let element of body.user.recoList) {
          userList.push(element._id);
        }
        setUserReco([...userList]);
      }
    };
    getUserInfo();
  }, []);

  //RECOMMENDATION FILTER
  const RecommendationsFilter = () => {
    const filteredRecommendations = allRecommendations.filter(
      (recommendation) => {
        if (filtre === "All") {
          console.log("filtre = All");
          return recommendation;
        } else {
          console.log("filtre =", filtre);
          return recommendation.category.includes(filtre);
        }
      }
    );
    return filteredRecommendations;
  };

  const filteredList = RecommendationsFilter();
  console.log("filteredList =>", filteredList);

  // GET ONE RANDOM RECOMMENDATION
  const getRandomReco = () => {
    const randomRecommendation =
      filteredList[Math.floor(Math.random() * filteredList.length)];
    setRandomReco(randomRecommendation);
  };

  // FONCTION ADDRECO (ACTIVATED WHEN YOU CLICK ON THE EMPTY HEART)
  async function addReco(randomReco) {
    console.log("click ADD");
    // 1 UPDATE DATABASE
    let data = await fetch("/addReco", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "tokenFromFront=" +
        props.token +
        "&alreadyInDBFromFront=true" +
        "&categoryFromFront=" +
        randomReco.category +
        "&titleFromFront=" +
        randomReco.title +
        "&imageUrlFromFront=" +
        randomReco.imageUrl +
        "&APIidFromFront=" +
        randomReco.APIid +
        "&recoIdFromFront=" +
        randomReco._id,
    });
    let response = await data.json();

    //2 UPDATE THE FRONT

    if (response) {
      let newList = userReco;
      newList.push(randomReco._id);
      setUserReco([...newList]);
    }
  }

  // FUNCTION DELETERECO (ACTIVATED WHEN YOU CLICK ON A FULL HEART)
  async function deleteReco(randomReco) {
    console.log("click DELETE");
    //1 UPDATE DATABASE
    let data = await fetch(`/deleteReco/${props.token}/${randomReco._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    let response = await data.json();

    //2 UPDATE THE FRONT END
    if (response) {
      let newList = userReco;
      newList = userReco.filter((e) => e !== randomReco._id);
      setUserReco([...newList]);
    }
  }

  // DISPLAY EMPTY/FULL HEART IF ALREADY LIKED
  if (props.token) {
    if (userReco.includes(randomReco._id)) {
      heart = (
        <AiFillHeart
          style={{ fontSize: "30px" }}
          onClick={() => {
            deleteReco(randomReco);
          }}
        />
      );
    } else if (!userReco.includes(randomReco._id)) {
      heart = (
        <AiOutlineHeart
          style={{ fontSize: "30px" }}
          onClick={() => {
            addReco(randomReco);
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
      {randomReco ? (
        (Reco = (
          <div
            style={{
              backgroundColor: "#FFDBD0",
              marginTop: "3%",
              paddingTop: "3%",
              paddingBottom: "3%",
            }}
          >
            <Row style={{ marginBottom: "3%" }}>
              <Col xs={12} md={6} lg={12}>
                <h3 className="Title">{randomReco.title}</h3>
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
                  src={randomReco.imageUrl}
                  alt={randomReco.title}
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
          </div>
        ))
      ) : (
        <div>
          <Row style={{ marginBottom: "3%" }}>
            <Col xs={12} md={6} lg={12}>
              <h3 className="Title">OUPS NOTHING IN THIS CATEGORY...</h3>
            </Col>
          </Row>
        </div>
      )}
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
              getRandomReco();
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
