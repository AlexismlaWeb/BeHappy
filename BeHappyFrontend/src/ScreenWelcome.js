import React, { useState, useEffect } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export default function ScreenWelcome() {
  return (
    <div>
      <div>ScreenWelcome</div>
      <Link to="/screenrandom">Go to Random page</Link>
    </div>
  );
}
