import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import EditLabels from "../editLabels/EditLabels";
import Modal from "../modal/Modal";

import { ReactComponent as NoteIcon } from "../../asset/sideMenuIcon/Note.svg";
import { ReactComponent as RemindIcon } from "../../asset/sideMenuIcon/Remind.svg";
import { ReactComponent as ArchiveIcon } from "../../asset/sideMenuIcon/Archive.svg";
import { ReactComponent as EditIcon } from "../../asset/sideMenuIcon/Edit.svg";
import { ReactComponent as TrashIcon } from "../../asset/sideMenuIcon/Trash.svg";

import { ADD_ACTIVE_CLASS } from "../../redux/type/MenuType";

import "./SideMenu.scss";

export default function SideMenu() {
  const dispatch = useDispatch();
  const { idMenuItemActive, isListActive } = useSelector(
    (state) => state.MenuReducer
  );

  const [listClass, setListClass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const addActiveClass = (e) => {
    e.preventDefault();
    let idActive = e.target.id;

    let title = e.target.children[0].children[0].children[1].innerHTML;
    if (title === "Notes") {
      title = "Keep";
    }
    dispatch({
      type: ADD_ACTIVE_CLASS,
      idActive,
      title,
    });
  };

  useEffect(() => {
    for (let item of document.querySelectorAll(".listItem__item")) {
      item.classList.remove("active");
    }
    document.getElementById(`${idMenuItemActive}`)?.classList.add("active");
    if (isListActive) {
      setListClass("active");
    } else {
      setListClass("");
    }
  }, [idMenuItemActive, isListActive]);

  return (
    <div className="sideMenu">
      <ul className={`listItem ${listClass}`}>
        <li className="listItem__item" id="item1" onClick={addActiveClass}>
          <div className="item__content">
            <NoteIcon />
            <span>Notes</span>
          </div>
        </li>
        <li className="listItem__item " id="item2" onClick={addActiveClass}>
          <div className="item__content">
            <RemindIcon />
            <span>Reminders</span>
          </div>
        </li>

        <li className="listItem__item " id="item3" onClick={addActiveClass}>
          <div className="item__content">
            <EditIcon />
            <span>Edit labels</span>
          </div>

        </li>
        <li className="listItem__item " id="item4" onClick={addActiveClass}>
          <div className="item__content">
            <ArchiveIcon />
            <span>Archive</span>
          </div>
        </li>
        <li className="listItem__item " id="item5" onClick={addActiveClass}>
          <div className="item__content">
            <TrashIcon />
            <span>Trash</span>
          </div>
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
