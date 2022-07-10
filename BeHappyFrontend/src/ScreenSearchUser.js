import React, { useState, useEffect } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { Button } from "antd";
import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function ScreenSearchUser() {
  return (
    <Container fluid>
      <Row>
        <Col xs="1" md="3" lg="4"></Col>
        <Col xs="10" md="6" lg="4" className="Myaccount-Box">
          <img src="../AvatarTest.png" className="Avatar" />
          <Link className="Myaccount-Link">MY ACCOUNT</Link>
        </Col>
        <Col xs="1" md="3" lg="4"></Col>
      </Row>
      <Row>
        <Col xs="1" md="3" lg="4"></Col>
        <Col xs="10" md="6" lg="4">
          <p className="Title">EXPLORE HAPPY LISTS</p>
        </Col>
        <Col xs="1" md="3" lg="4"></Col>
      </Row>
      <Row style={{ backgroundColor: "#DABFFF" }} className="Main-Row">
        <Col xs="1" md="3" lg="4"></Col>
        <Col
          xs="10"
          md="6"
          lg="4"
          style={{ height: "420px", overflowY: "auto" }}
        >
          <Input
            className="Input"
            type="title"
            name="title"
            placeholder="Search via pseudo"
          />
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
          <div className="List">
            <div className="List">
              <img src="../AvatarTest.png" className="User-Avatar" />
              <p className="User-Pseudo">@JoeyPasta</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className="Right-Icon"
            />
          </div>
        </Col>
        <Col xs="1" md="3" lg="4"></Col>
      </Row>
      <Row>
        <Col xs="1" md="3" lg="4"></Col>
        <Col xs="10" md="6" lg="4" className="Bottom">
          <Button
            className="Button-Shadow"
            style={{ boxShadow: "10px 10px #DABFFF" }}
          >
            UPDATE MY LIST
          </Button>
          <Button
            className="Button-Shadow"
            style={{ boxShadow: "10px 10px #DABFFF" }}
          >
            SURPRISE ME
          </Button>
        </Col>
        <Col xs="1" md="3" lg="4" className="col3"></Col>
      </Row>
    </Container>
  );
}
