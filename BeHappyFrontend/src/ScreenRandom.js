import React, { useState, useEffect } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export default function ScreenRandom() {
  return (
    <div>
      <div>ScreenRandom</div>
      <Link to="/screenprofile">Go to Profile page</Link>
    </div>
  );
}
