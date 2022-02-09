import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import labelIcon from "../../asset/editorIcon/label.svg";

import EditLabels from "../editLabels/EditLabels";

import { ReactComponent as NoteIcon } from "../../asset/sideMenuIcon/Note.svg";
import { ReactComponent as RemindIcon } from "../../asset/sideMenuIcon/Remind.svg";
import { ReactComponent as ArchiveIcon } from "../../asset/sideMenuIcon/Archive.svg";
import { ReactComponent as EditIcon } from "../../asset/sideMenuIcon/Edit.svg";
import { ReactComponent as TrashIcon } from "../../asset/sideMenuIcon/Trash.svg";


import Modal from "../modal/Modal";
import "./SideMenu.scss";
export default function SideMenu(props) {
  const { isListActive } = useSelector((state) => state.menu);
  const { arrLabel } = useSelector((state) => state.note);


  const [listClass, setListClass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);


  const renderLabels = () => {
    return arrLabel.map((label) => {
      return (
        <li className="list-item__item ">
          <div className="item__content">
            <img src={labelIcon} alt="..." />
            <span>
              <Link to="/">{label}</Link>
            </span>
          </div>
        </li>
      );
    });
  };

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

  }, []);

  return (
    <div className="sideMenu">
      <ul className={`list-item ${listClass}`}>
        <li className="list-item__item" id="notes">
          <div className="item__content">
            <NoteIcon />
            <span>
              <Link to="/">Notes</Link>
            </span>
          </div>
        </li>
        <li className="list-item__item " id="reminders">
          <div className="item__content">
            <RemindIcon />
            <span>
              <Link to="/reminder">Reminders</Link>
            </span>
          </div>
        </li>
        {renderLabels()}

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
