import React, { useState, useEffect } from "react";
import "./App.css";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { Button } from "antd";
import { Input } from "reactstrap";
import HeaderComposant from "./HeaderComposant";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "react-bootstrap/Modal";

function ScreenSearchReco(props) {
  const history = useHistory();

  const [show, setShow] = useState(false);

  const [searchCategory, setSearchCategory] = useState("Category");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchError, setSearchError] = useState("");

  const [addCategory, setAddCategory] = useState("Category");
  const [addTitle, setAddTitle] = useState("");
  const [addLink, setAddLink] = useState("");
  const [addError, setAddError] = useState("");

  const [resultsList, setResultsList] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let heart;

  // SEARCH IN  API & BDD
  async function searchReco(category, title, link, origin) {
    console.log("IN searchReco() =>", category, title, link, origin);
    setSearchError("");
    setAddError("");

    let error = "";

    if (!category || category === "Category" || !title) {
      error = "OUPS, THERE IS AN EMPTY FIELD";
    } else if (category === "Other") {
      // addOther(category, title, link);
    } else {
      let data = await fetch(`/search${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "queryFromFront=" + title + "&tokenFromFront=" + props.token,
      });

      let response = await data.json();
      console.log("response =>", response);
      if (response.length === 0) {
        error = "OUPS... THERE IS NO RESULT";
      } else {
        handleShow();
        setResultsList(response);
        // AFFICHER LES PROPOSITIONS
      }
    }

    if (origin === "searchClick") {
      setSearchError(error);
    } else if (origin === "addClick") {
      setAddError(error);
    }

    setSearchCategory("Category");
    setSearchTitle("");
    setAddCategory("");
    setAddTitle("");
    setAddLink("");
  }

  // FONCTION ADD (activated when you click on the heart icon)
  async function addReco(element, index) {
    console.log("element clicked, in addReco =>", element, index);

    // UPDATE DATABASE
    let data = await fetch("/addReco", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "tokenFromFront=" +
        props.token +
        "&alreadyInDBFromFront=" +
        element.alreadyInDB +
        "&categoryFromFront=" +
        element.category +
        "&titleFromFront=" +
        element.title +
        "&imageUrlFromFront=" +
        element.imageUrl +
        "&APIidFromFront=" +
        element.APIid +
        "&recoIdFromFront=" +
        element.id,
    });
    let response = await data.json();

    // UPDATE RESULTSLIST FOR THE FRONTEND
    let newList = resultsList;
    newList[index].alreadyInDB = true;
    newList[index].alreadyLiked = true;
    newList[index].followers = resultsList[index].followers + 1;
    newList[index].id = response.savedReco._id;
    setResultsList([...newList]);
    console.log("resultsList after modification =>", resultsList);
  }

  // FONCTION ADDOTHER à activer si category = other dans searchReco()
  async function addOther(addTitle, addLink) {
    console.log("click addOther");

    let data = await fetch("/addReco", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "tokenFromFront=" +
        props.token +
        "&alreadyInDBFromFront=false&categoryFromFront=Other&titleFromFront=" +
        addTitle +
        "&imageUrlFromFront=" +
        addLink +
        "&APIidFromFront=null",
    });
    let response = await data.json();
    console.log("response from addOther=>", response);
  }

  // FUNCTION DELETE (activated when you click on the full heart)
  async function deleteReco(element, index) {
    console.log("element clicked, in deleteReco =>", element, index);
    console.log("element.id =>", element.id);

    //1 UPDATE DATABASE
    let data = await fetch(`/deleteReco/${props.token}/${element.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    let response = await data.json();

    //2 UPDATE RESULTSLIST FOR THE FRONT END
    let newList = resultsList;
    newList[index].alreadyLiked = false;
    resultsList[index].followers = resultsList[index].followers - 1;
    if (!response.savedReco._id) {
      newList[index].alreadyInDB = false;
      newList[index].id = null;
      newList[index].followers = 0;
    }
    setResultsList([...newList]);
    console.log("resultsList after modification =>", resultsList);
  }

  // MAP POUR AFFICHER LES PROPOSITIONS
  if (resultsList.length > 0) {
    var mapResultsList = resultsList.map((element, index) => {
      if (element.alreadyLiked == true) {
        heart = (
          <AiFillHeart
            style={{ fontSize: "25px" }}
            onClick={() => {
              console.log("DELETE Click, index", index);
              deleteReco(element, index);
            }}
          />
        );
      } else if (element.alreadyLiked == false) {
        heart = (
          <AiOutlineHeart
            style={{ fontSize: "25px" }}
            onClick={() => {
              console.log("ADD Click");
              addReco(element, index);
            }}
          />
        );
      }
      return (
        <div className="List" key={index}>
          <div className="List">
            <img src={element.imageUrl} className="Reco-Image" alt="recoIMG" />
            <div className="Reco-Infos">
              <p className="Reco">{element.title}</p>
            </div>
          </div>
          <div className="Reco-Likes">
            {heart}
            <p className="Reco">{element.followers}</p>
          </div>
        </div>
      );
    });
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
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="Category">Category</option>
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
                searchReco(searchCategory, searchTitle, null, "searchClick");
              }}
            >
              SEARCH
            </Button>
            <p className="Text">{searchError}</p>
            <p className="Text">ADD YOUR RECO FROM SCRATCH</p>
            <Input
              className="Input"
              type="select"
              name="searchCategory"
              id="searchCategory"
              value={addCategory}
              onChange={(e) => setAddCategory(e.target.value)}
            >
              <option value="Category">Category</option>
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
                searchReco(addCategory, addTitle, addLink, "addClick");
              }}
            >
              ADD TO MY HAPPY LIST
            </Button>
            <p className="Text">{addError}</p>
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
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row style={{ backgroundColor: "#ffd2ee" }} className="Main-Row">
              <Col xs="1" md="3" lg="4"></Col>
              <Col
                xs="10"
                md="6"
                lg="4"
                style={{ height: "420px", overflowY: "auto" }}
              >
                {mapResultsList}
              </Col>
              <Col xs="1" md="3" lg="4"></Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    );
  } else {
    return <Redirect to="/screenrandom" />;
  }
}

function mapStateToProps(state) {
  return { token: state.token, user: state.user };
}

export default connect(mapStateToProps, null)(ScreenSearchReco);
