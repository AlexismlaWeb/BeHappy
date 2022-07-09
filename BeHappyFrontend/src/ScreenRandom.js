import React, { useState, useEffect } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ScreenRandom() {
  return (
    <div className="Global">
      <div className="Top">
        <p className="Title">WHAT MAKES YOU HAPPY?</p>
      </div>

      <div className="Middle">
        <FormGroup className="Form">
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
          <p className="Text">
            YOU DIDN'T FIND WHAT YOU WERE LOOKING FOR? ADD YOUR RECO FROM
            SCRATCH
          </p>

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
        </FormGroup>
      </div>
      <div className="Bottom">
        <Button className="Button">EXPLORE LISTS</Button>
        <Button className="Button">SURPRISE ME</Button>
      </div>
    </div>
  );
}
