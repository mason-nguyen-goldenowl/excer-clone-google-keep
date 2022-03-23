import React, { useState } from "react";

import CreatorCommponent from "../Creator/Creator";

import "./NoteText.scss";

export default function NoteText(props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="note-text_warp">
      <div className="note-text">
        <div className="note-text__show">
          {!modalOpen && (
            <div
              className="show__input "
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Take a note...
            </div>
          )}

          {modalOpen && (
            <CreatorCommponent
              setOpenModal={setModalOpen}
              label={props.label}
            />
          )}
        </div>
      </div>
    </div>
  );
}
