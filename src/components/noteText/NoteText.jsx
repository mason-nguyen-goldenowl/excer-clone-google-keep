import React, { useState } from "react";
import Editor from "../editor/Editor";
import Modal from "../modal/Modal";
import "./NoteText.scss";

export default function NoteText() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="noteText">
      <div className="noteText__show">
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
            <Editor
              setOpenModal={setModalOpen}
              bgColor="none"
              display="block"
              height="auto"
              width="auto"
            />
          }
        />
      )}
    </div>
  );
}
