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
import {
  faChevronCircleRight,
  faXmarkCircle,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function ScreenUser() {
  return (
    <Container fluid>
      <Row>
        <Col xs="1" md="3" lg="4"></Col>
        <Col xs="10" md="6" lg="4" className="Editmyprofile-Box">
          <img src="../AvatarTest.png" className="Avatar" />
          <Button
            className="Button-Shadow"
            style={{ boxShadow: "5px 5px #F1E2FF", height: "20px" }}
          >
            + FOLLOW
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
      <Row style={{ backgroundColor: "#F1E2FF" }} className="Main-Row">
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
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
            <FontAwesomeIcon icon={faCirclePlus} className="Right-Icon" />
          </div>
        </Col>
        <Col xs="1" md="3" lg="4"></Col>
      </Row>
      <Row>
        <Col xs="1" md="3" lg="4"></Col>
        <Col xs="10" md="6" lg="4" className="Bottom">
          <Button
            className="Button-Shadow"
            style={{ boxShadow: "10px 10px #F1E2FF" }}
          >
            UPDATE MY LIST
          </Button>
          <Button
            className="Button-Shadow"
            style={{ boxShadow: "10px 10px #F1E2FF" }}
          >
            SURPRISE ME
          </Button>
        </Col>
        <Col xs="1" md="3" lg="4" className="col3"></Col>
      </Row>
    </Container>
  );
}
