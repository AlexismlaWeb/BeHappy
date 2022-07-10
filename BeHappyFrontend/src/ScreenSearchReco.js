import React, { useState, useEffect } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { Button } from "antd";
import { Input } from "reactstrap";

export default function ScreenSearchReco() {
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
          <p className="Title">WHAT MAKES YOU HAPPY?</p>
        </Col>
        <Col xs="1" md="3" lg="4"></Col>
      </Row>
      <Row style={{ backgroundColor: "#ffd2ee" }}>
        <Col xs="1" md="3" lg="4"></Col>
        <Col xs="10" md="6" lg="4" className="Main-Row">
          <p className="Text">SEARCH THROUGH OUR LIBRARIES</p>
          <Input
            className="Input"
            type="select"
            name="select"
            id="exampleSelect"
          >
            <option>Category</option>
            <option>Film</option>
            <option>Serie</option>
            <option>Podcast</option>
            <option>Music</option>
            <option>Book</option>
            <option>Other</option>
          </Input>
          <Input
            className="Input"
            type="title"
            name="title"
            placeholder="Title"
          />
          <Button className="Button-Submit">SEARCH</Button>
          <p className="Text">ADD YOUR RECO FROM SCRATCH</p>

          <Input
            className="Input"
            type="select"
            name="select"
            id="exampleSelect"
          >
            <option>Category</option>
            <option>Film</option>
            <option>Serie</option>
            <option>Podcast</option>
            <option>Music</option>
            <option>Book</option>
            <option>Other</option>
          </Input>
          <Input
            className="Input"
            type="title"
            name="title"
            placeholder="Title"
          />
          <Input
            className="Input"
            type="title"
            name="title"
            placeholder="Title"
          />
          <Input className="Input" type="link" name="link" placeholder="Link" />
          <Input className="Input" name="img" placeholder="Image" />
          <Button className="Button-Submit">ADD TO MY HAPPY LIST</Button>
        </Col>
        <Col xs="1" md="3" lg="4"></Col>
      </Row>
      <Row>
        <Col xs="1" md="3" lg="4"></Col>
        <Col xs="10" md="6" lg="4" className="Bottom">
          <Button
            className="Button-Shadow"
            style={{ boxShadow: "10px 10px #ffd2ee" }}
          >
            EXPLORE OTHER LISTS
          </Button>
          <Button
            className="Button-Shadow"
            style={{ boxShadow: "10px 10px #ffd2ee" }}
          >
            SURPRISE ME
          </Button>
        </Col>
        <Col xs="1" md="3" lg="4" className="col3"></Col>
      </Row>
    </Container>
  );
}
