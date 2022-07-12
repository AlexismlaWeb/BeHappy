import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Input } from "reactstrap";

import "./App.css";
import { useParams, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

function ScreenSignInUp(props) {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [userExists, setUserExists] = useState(false);

  const [listErrorsSignin, setErrorsSignin] = useState([]);
  const [listErrorsSignup, setErrorsSignup] = useState([]);

  var handleSubmitSignup = async () => {
    const data = await fetch("/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
    });

    const body = await data.json();

    if (body.result == true) {
      props.addToken(body.token);
      setUserExists(true);
    } else {
      setErrorsSignup(body.error);
    }
  };

  var handleSubmitSignin = async () => {
    const data = await fetch("/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
    });

    const body = await data.json();

    if (body.result == true) {
      props.addToken(body.token);
      setUserExists(true);
    } else {
      setErrorsSignin(body.error);
    }
  };

  if (userExists) {
    return <Redirect to="/screenprofile" />;
  }

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return <p>{error}</p>;
  });

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return <p>{error}</p>;
  });

  return (
    <Container fluid style={{ backgroundColor: "#feffe7" }}>
      <Row>
        <Col xs={12}>
          <h2 className="Title-sign">
            GET CONNECTED & START SHARING YOUR RECO
          </h2>
        </Col>
      </Row>
      <Row>
        <Row>
          <Col xs={12}>
            <p className="Text" style={{ marginBottom: "1%" }}>
              I HAVE AN ACCOUNT
            </p>
          </Col>
        </Row>
        <Row className="">
          <Row>
            <Col
              xs={12}
              className="d-flex justify-content-center align-items-center"
            >
              <Input
                onChange={(e) => setSignInEmail(e.target.value)}
                className="Input"
                placeholder="email"
                type="email"
              />
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              className="d-flex justify-content-center align-items-center"
            >
              <Input
                onChange={(e) => setSignInPassword(e.target.value)}
                className="Input"
                type="password"
                placeholder="password"
              />
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              className="d-flex justify-content-center align-items-center"
            >
              {tabErrorsSignin}
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              className="d-flex justify-content-center align-items-center"
            >
              <Button
                onClick={() => handleSubmitSignin()}
                className="Button-Shadow"
                style={{
                  boxShadow: "10px 10px #ffd2ee",
                  width: "50%",
                  height: "70%",
                  fontSize: "20px",
                }}
              >
                SIGN IN
              </Button>
            </Col>
          </Row>
          <Row className="">
            <Row>
              <Col
                xs={12}
                className="d-flex justify-content-center align-items-center"
              >
                <p className="Text" style={{ marginBottom: "4%" }}>
                  CREATE MY ACCOUNT
                </p>
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                className="d-flex justify-content-center align-items-center"
              >
                <Input
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  className="Input "
                  placeholder="username"
                />
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                className="d-flex justify-content-center align-items-center"
              >
                <Input
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="Input"
                  placeholder="email"
                  type="email"
                />
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                className="d-flex justify-content-center align-items-center"
              >
                <Input
                  type="password"
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  className="Input"
                  placeholder="password"
                />
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                className="d-flex justify-content-center align-items-center"
              >
                {tabErrorsSignup}
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                className="d-flex justify-content-center align-items-center"
              >
                <Button
                  onClick={() => handleSubmitSignup()}
                  className="Button-Shadow"
                  style={{
                    boxShadow: "10px 10px #ffd2ee",
                    width: "50%",
                    height: "70%",
                    fontSize: "20px",
                  }}
                >
                  SIGN-UP
                </Button>
              </Col>
            </Row>
          </Row>
        </Row>
      </Row>
    </Container>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(ScreenSignInUp);
