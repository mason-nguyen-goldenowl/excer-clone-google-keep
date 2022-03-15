import React, { useState } from "react";
import EditorComponent from "../editor/Editor";

import Modal from "../modal/Modal";
import "./NoteText.scss";

export default function NoteText(props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="note-text">
      <div className="note-text__show">
        <div
          className="show__input "
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Take a note...
        </div>
      </div>

      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          children={
            <EditorComponent setOpenModal={setModalOpen} label={props.label} />
          }
        />
      )}
    </div>
  );
}
