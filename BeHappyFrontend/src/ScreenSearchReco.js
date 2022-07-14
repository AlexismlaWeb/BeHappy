import React, { useState, useEffect } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { Button } from "antd";
import { Input } from "reactstrap";
import HeaderComposant from "./HeaderComposant";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function ScreenSearchReco(props) {
  const history = useHistory();
  const [searchCategory, setSearchCategory] = useState("Category");
  const [searchTitle, setSearchTitle] = useState("");

  const [addCategory, setAddCategory] = useState("Category");
  const [addTitle, setAddTitle] = useState("");
  const [addLink, setAddLink] = useState("");

  const [resultsList, setResultsList] = useState([]);
  const [error, setError] = useState("");

  // RÉCUPÉRER LE TOKEN DE L'UTILISATEUR CONNECTÉ DANS LE STORE
  let token = "KmWnmF-_xvjfykiesrJncP-xtc19esy0";

  // SEARCH API & BDD
  async function searchReco(category, title, link) {
    console.log("IN searchReco() =>", category, title, link);

    setError("");
    if (category === "Other") {
      addReco(category, title, link);
    } else {
      let data = await fetch(`/search${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "queryFromFront=" + title,
      });

      let response = await data.json();
      console.log("response =>", response);
      if (response.length === 0) {
        setError("OUPS... THERE IS NO RESULT");
      } else {
        setResultsList(response);
        // AFFICHER LES PROPOSITIONS
      }
    }

    setSearchCategory("Category");
    setSearchTitle("");
    setAddCategory("");
    setAddTitle("");
    setAddLink("");
  }

  // FONCTION à activer si :
  // category = other dans searchReco()
  // OU si click sur un bouton ADD

  function addReco(category, title, link) {
    console.log("in addReco() =>", category, title, link);
  }

  // FONCTION à activer si click sur un bouton LIKE
  function likeReco() {}

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
            name="searchCategory"
            id="searchCategory"
            value={searchCategory}
            defaultValue={"default"}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value={"default"}>Category</option>
            <option value="Film">Film</option>
            <option value="Serie">Serie</option>
            <option value="Book">Book</option>
            <option value="Music">Music</option>
            <option value="Podcast">Podcast</option>
          </Input>
          <Input
            className="Input"
            placeholder="Title"
            onChange={(e) => setSearchTitle(e.target.value)}
            value={searchTitle}
          />
          <Button
            className="Button-Submit"
            onClick={() => {
              console.log("SEARCH Click =>", searchCategory, searchTitle);
              searchReco(searchCategory, searchTitle);
            }}
          >
            SEARCH
          </Button>
          <p className="Text">{error}</p>
          <p className="Text">ADD YOUR RECO FROM SCRATCH</p>
          <Input
            className="Input"
            type="select"
            name="searchCategory"
            id="searchCategory"
            value={addCategory}
            defaultValue={"default"}
            onChange={(e) => setAddCategory(e.target.value)}
          >
            <option value={"default"}>Category</option>
            <option value="Film">Film</option>
            <option value="Serie">Serie</option>
            <option value="Book">Book</option>
            <option value="Music">Music</option>
            <option value="Podcast">Podcast</option>
            <option value="Other">Other</option>
          </Input>
          <Input
            className="Input"
            placeholder="Title"
            onChange={(e) => setAddTitle(e.target.value)}
            value={addTitle}
          />
          <Input
            className="Input"
            placeholder="Link"
            onChange={(e) => setAddLink(e.target.value)}
            value={addLink}
          />
          <Button
            className="Button-Submit"
            onClick={() => {
              console.log("ADD click =>", addCategory, addTitle, addLink);
              searchReco(addCategory, addTitle, addLink);
            }}
          >
            ADD TO MY HAPPY LIST
          </Button>
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

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ScreenSearchReco);
