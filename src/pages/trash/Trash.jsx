import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Menu from "../../components/menu/Menu";
import NoteCardTrash from "../../components/noteCard/NoteCardTrash";
import SideMenu from "../../components/sideMenu/SideMenu";
import { EMPTYTRASH } from "../../redux/type/NoteType";
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
      type: EMPTYTRASH,
    });
  };
  return (
    <div>
      <Menu title="Trash" />
      <div className="bodyContent">
        <div className="left">
          <SideMenu active="trash" />
        </div>
        <div className="right">
          <div className="trash__dr">
            <p>Notes in Trash are deledted after 7 days</p>
            <span onClick={emptyTrashAction}>Empty Trash</span>
          </div>
          <div className="note__content">{renderNoteCard()}</div>
        </div>
      </div>
    </div>
  );
}
