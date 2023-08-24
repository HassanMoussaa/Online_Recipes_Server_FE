import React from "react";
import "./Overlay.css";

function Overlay({ onClose }) {
  return <div className="overlay" onClick={onClose}></div>;
}

export default Overlay;
