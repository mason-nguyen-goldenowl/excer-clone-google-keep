import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Menu from "../../components/menu/Menu";
import NoteCardTrash from "../../components/noteCard/NoteCardTrash";
import SideMenu from "../../components/sideMenu/SideMenu";

import { EMPTY_TRASH } from "../../redux/type/NoteType";

import "./Trash.scss";

export default function Trash() {
  const disptach = useDispatch();
  const { arrTrash } = useSelector((state) => state.note);

  const renderNoteCard = () => {
    return arrTrash?.map((note, index) => {
      return <NoteCardTrash content={note} key={index} />;
    });
  };
  const emptyTrashAction = () => {
    disptach({
      type: EMPTY_TRASH,
    });
  };
  return (
    <div>
      <Menu title="Trash" />
      <div className="body-content">
        <div className="left">
          <SideMenu active="trash" />
        </div>
        <div className="right">
          <div className="trash__dr">
            <p>Notes in Trash are deleted after 7 days</p>

            <span onClick={emptyTrashAction}>Empty Trash</span>
          </div>
          <div className="note__content">{renderNoteCard()}</div>
        </div>
      </div>
    </div>
  );
}
