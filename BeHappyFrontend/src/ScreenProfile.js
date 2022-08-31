import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";

function ScreenProfile(props) {
  const history = useHistory();

  const navigateScreenrandom = () => {
    let path = `/screenrandom`;
    history.push(path);
  };

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const RecupUserInfo = async () => {
      if (props.token) {
        const data = await fetch("/getUserInfoByToken/" + props.token);
        const body = await data.json();
        if (body) {
          props.addUserInfo(body.user);
          setUserInfo(body.user);
        }
      }
    };
    RecupUserInfo();
  }, []);

  async function deleteReco(userToken, idReco) {
    // EDIT IN DATABASE
    let data = await fetch(`/deleteReco/${userToken}/${idReco}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    let response = await data.json();

    // EDIT TO RE-RENDER THE SCREEN
    let newList = userInfo.recoList.filter((e) => e._id != idReco);
    setUserInfo({ ...userInfo, recoList: newList });
  }

  if (userInfo) {
    var usersListReco = userInfo.recoList.map((reco, i) => {
      return (
        <div className="List" key={i}>
          <div className="List">
            <img src={reco.imageUrl} className="Reco-Image" alt="recoIMG" />
            <div className="Reco-Infos">
              <p className="Reco">{reco.category}</p>
              <p className="Reco">{reco.title}</p>
              <p className="Reco">Likes</p>
            </div>
          </div>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="Right-Icon"
            onClick={() => {
              deleteReco(props.token, reco._id);
            }}
          />
        </div>
      );
    });
  } else {
    usersListReco = "No Recommendation";
  }
  if (props.token) {
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
              EDIT MY PROFILE
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
              className="Button-Shadow"
              style={{ boxShadow: "10px 10px #D7E8DA" }}
              onClick={() => {
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
    addUserInfo: function (user) {
      dispatch({ type: "addUserInfo", user: user });
    },
  };
}

function mapStateToProps(state) {
  return { token: state.token, user: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenProfile);
