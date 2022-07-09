import React, { useState, useEffect } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export default function ScreenProfile() {
  return (
    <div>
      <div>ScreenProfile</div>
      <Link to="/screensearch">Go to Search page</Link>
    </div>
  );
}
