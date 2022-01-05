import React from "react";
import "./Body.scss";
import SideMenu from "../sideMenu/SideMenu";
import NoteText from "../noteText/NoteText";

export default function Body() {
  return (
    <div className="bodyContent">
      <div className="left">
        <SideMenu />
      </div>
      <div className="right">
        <div className="editorWrap">
          <NoteText />
        </div>
        <div>asdgsd</div>
      </div>
    </div>
  );
}
