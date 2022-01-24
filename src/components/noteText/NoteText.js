import React, { useState } from "react";
import Editor from "../editor/Editor";

import "./NoteText.scss";

export default function NoteText() {
  const [isActive, setActive] = useState(false);
  let showClass = "";
  if (isActive === true) {
    showClass = "active";
  }
  return (
    <div className="note-text">
      <div className="note-text__show">
        <div className={`editor-wrap ${showClass}`}>
          <Editor />
        </div>
      </div>
    </div>
  );
}
