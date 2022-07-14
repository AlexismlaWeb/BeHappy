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
  const [resultsList, setResultsList] = useState([]);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("Category");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  // RÉCUPÉRER LE TOKEN DE L'UTILISATEUR CONNECTÉ DANS LE STORE
  let token = "KmWnmF-_xvjfykiesrJncP-xtc19esy0";

  async function searchReco(searchCategory, searchTitle) {
    console.log("dans searchReco() =>", searchCategory, searchTitle);
    setError("");

    let data = await fetch(`/search${searchCategory}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "queryFromFront=" + searchTitle,
    });

    let response = await data.json();
    console.log("response =>", response);
    if (response.length === 0) {
      setError("OUPS... THERE IS NO RESULT");
    } else {
      setResultsList(response);
    }

    setSearchCategory("Category");
    setSearchTitle("");
  }

  function addRecoFromScratch(category, title, link) {
    console.log("dans addReco() =>", category, title, link);

    setCategory("Category");
    setTitle("");
    setLink("");
  }
  if (props.token) {
    return (
      <Container fluid>
        <HeaderComposant />
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
              <option value="music">Music</option>
              <option value="podcast">Podcast</option>
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
                console.log("searchClick =>", searchCategory, searchTitle);
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
              name="category"
              id="category"
              value={category}
              defaultValue={"default"}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={"default"}>Category</option>
              <option value="film">Film</option>
              <option value="serie">Serie</option>
              <option value="podcast">Podcast</option>
              <option value="music">Music</option>
              <option value="book">Book</option>
              <option value="other">Other</option>
            </Input>
            <Input
              className="Input"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Input
              className="Input"
              placeholder="Link"
              onChange={(e) => setLink(e.target.value)}
              value={link}
            />
            <Button
              className="Button-Submit"
              onClick={() => {
                console.log("click =>", category, title, link);
                addRecoFromScratch(category, title, link);
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
              onClick={() => {
                history.push("/screensearchuser");
              }}
            >
              EXPLORE OTHER LISTS
            </Button>
            <Button
              className="Button-Shadow"
              style={{ boxShadow: "10px 10px #ffd2ee" }}
              onClick={() => {
                history.push("/screenrandom");
              }}
            >
              SURPRISE ME
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

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(ScreenSearchReco);
