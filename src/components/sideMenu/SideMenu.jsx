import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Modal from "../modal/Modal";
import EditLabels from "../editLabels/EditLabels";

import { ReactComponent as NoteIcon } from "../../asset/sideMenuIcon/Note.svg";
import { ReactComponent as RemindIcon } from "../../asset/sideMenuIcon/Remind.svg";
import { ReactComponent as ArchiveIcon } from "../../asset/sideMenuIcon/Archive.svg";
import { ReactComponent as EditIcon } from "../../asset/sideMenuIcon/Edit.svg";
import { ReactComponent as TrashIcon } from "../../asset/sideMenuIcon/Trash.svg";

import "./SideMenu.scss";

export default function SideMenu(props) {
  const { isListActive } = useSelector((state) => state.MenuReducer);

  const [listClass, setListClass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isListActive) {
      setListClass("active");
    } else {
      setListClass("");
    }
    for (let item of document.querySelectorAll(".list-item__item")) {
      item.classList.remove("active");
    }
    document.getElementById(`${props.active}`)?.classList.add("active");
  }, [isListActive, props.active]);
  return (
    <div className="side-menu">
      <ul className={`list-item ${listClass}`}>
        <li className="list-item__item" id="notes">
          <Link to="/">
            <div className="item__content">
              <NoteIcon />
              <span>Notes</span>
            </div>
          </Link>
        </li>
        <li className="list-item__item " id="reminders">
          <Link to="/reminder">
            <div className="item__content">
              <RemindIcon />
              <span>Reminders</span>
            </div>
          </Link>
        </li>
        <li
          className="list-item__item "
          id="item3"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <div className="item__content">
            <EditIcon />
            <span>Edit labels</span>
          </div>
        </li>
        <li className="list-item__item " id="archive">
          <Link to="/archive">
            <div className="item__content">
              <ArchiveIcon />
              <span>Archive</span>
            </div>
          </Link>
        </li>
        <li className="list-item__item " id="trash">
          <Link to="/trash">
            <div className="item__content">
              <TrashIcon />
              <span>Trash</span>
            </div>
          </Link>
        </li>
      </ul>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          children={<EditLabels setOpenModal={setModalOpen} />}
        />
      )}
    </div>
  );
}
