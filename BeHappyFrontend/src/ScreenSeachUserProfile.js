import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { Button } from "antd";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";

function ScreenSearchUserProfile(props) {
  const history = useHistory();

  const navigateScreenrandom = () => {
    let path = `/screenrandom`;
    history.push(path);
  };

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const RecupUserInfo = async () => {
      if (props.token) {
        // RECUP INFOS DE L'INFLUENCEUR
        const data = await fetch(
          "/getUserInfoByToken/" + props.history.location.state.user.token
        );
        const body = await data.json();
        if (body) {
          for (let i = 0; i < body.user.recoList.length; i++) {
            if (
              (body.user.recoList[i].imageUrl.includes("null") &&
                body.user.recoList[i].category === "Movie") ||
              body.user.recoList[i].category === "Film"
            ) {
              body.user.recoList[i].imageUrl = "../movie.jpg";
            } else if (
              body.user.recoList[i].imageUrl.includes("null") &&
              body.user.recoList[i].category === "Serie"
            ) {
              body.user.recoList[i].imageUrl = "../series.png";
            }
          }
        }

        // RECUP INFOS DU USER CONNECTE
        console.log("props.token", props.token);
        const data2 = await fetch("/getUserInfoByToken/" + props.token);
        const body2 = await data2.json();
        console.log("body2,", body2);

        if (body && body2) {
          for (let userReco of body2.user.recoList) {
            for (let influenceurReco of body.user.recoList) {
              if (userReco._id === influenceurReco._id) {
                influenceurReco.alreadyLiked = true;
              } else {
                influenceurReco.alreadyLiked = false;
              }
            }
          }
          setUserInfo(body.user);
        }
      }
    };
    RecupUserInfo();
  }, []);
  let heart;

  // FONCTION ADD (activated when you click on the empty heart icon)
  async function addReco(element, index) {
    // UPDATE DATABASE
    console.log("element", element);
    let data = await fetch("/addReco", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "tokenFromFront=" +
        props.token +
        "&alreadyInDBFromFront=true" +
        "&categoryFromFront=" +
        element.category +
        "&titleFromFront=" +
        element.title +
        "&imageUrlFromFront=" +
        element.imageUrl +
        "&APIidFromFront=" +
        element.APIid +
        "&recoIdFromFront=" +
        element._id,
    });
    let response = await data.json();
    console.log("response", response);
    let newList = userInfo;
    newList.recoList[index].alreadyLiked = true;
    setUserInfo({ ...newList });
  }

  async function deleteReco(element, index) {
    //1 UPDATE DATABASE
    let data = await fetch(`/deleteReco/${props.token}/${element._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    let response = await data.json();

    //2 UPDATE RESULTSLIST FOR THE FRONT END
    let newList = userInfo;
    newList.recoList[index].alreadyLiked = false;
    setUserInfo({ ...newList });
  }

  if (userInfo) {
    var usersListReco = userInfo.recoList.map((reco, i) => {
      if (reco.alreadyLiked === true) {
        heart = (
          <AiFillHeart
            style={{ fontSize: "25px" }}
            onClick={() => {
              deleteReco(reco, i);
            }}
          />
        );
      } else if (reco.alreadyLiked === false) {
        heart = (
          <AiOutlineHeart
            style={{ fontSize: "25px" }}
            onClick={() => {
              addReco(reco, i);
            }}
          />
        );
      }
      return (
        <div className="List" key={i}>
          <div className="List">
            <img src={reco.imageUrl} className="Reco-Image" alt="recoIMG" />
            <div className="Reco-Infos">
              <p className="Reco">{reco.title}</p>
            </div>
          </div>
          <div className="Reco-Likes">
            {heart}
            <p className="Reco">{reco.followers}</p>
          </div>
        </div>
      );
    });
  } else {
    usersListReco = "No Recommendation";
  }
  if (props.history.location.state.user.token) {
    return (
      <Container fluid>
        <Row>
          <Col xs="1" md="3" lg="4"></Col>
          <Col xs="10" md="6" lg="4" className="Editmyprofile-Box">
            <img
              src="../AvatarTest.png"
              className="User-Avatar"
              alt="profileIMG"
            />

            <Button
              className="Button-Shadow"
              style={{ boxShadow: "5px 5px #D7E8DA", height: "20px" }}
            >
              FOLLOW
            </Button>
          </Col>
          <Col xs="1" md="3" lg="4"></Col>
        </Row>
        <Row>
          <Col xs="1" md="3" lg="4"></Col>
          <Col xs="10" md="6" lg="4">
            <p className="User-Pseudo" style={{ textAlign: "center" }}>
              @{userInfo ? userInfo.username : "Loading..."}
            </p>
            <div className="User-Stats">
              <p className="Text2">
                {userInfo ? userInfo.recoList.length : "Loading..."} RECO
              </p>
              <p className="Text2">
                {userInfo ? userInfo.followers.length : "Loading..."} FOLLOWERS
              </p>
              <p className="Text2">
                {userInfo ? userInfo.followed.length : "Loading..."} FOLLOWING
              </p>
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
            {usersListReco}
          </Col>
          <Col xs="1" md="3" lg="4"></Col>
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
                history.push("/screenprofile");
              }}
            >
              MY PROFILE
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
    addUserInfo: function (user) {
      dispatch({ type: "addUserInfo", user: user });
    },
  };
}

function mapStateToProps(state) {
  return { token: state.token, user: state.user };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSearchUserProfile);
