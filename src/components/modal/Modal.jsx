import React from "react";
import "./Modal.scss";
export default function Modal(props) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">{props.children}</div>
    </div>
  );
}
