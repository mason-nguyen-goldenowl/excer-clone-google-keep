import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../modal/Modal";

import CreateLabels from "../createLabels/CreateLabels";
import { getLabels } from "../../redux/action/LabelAction";

import labelIcon from "../../asset/editorIcon/label.svg";
import { ReactComponent as EditIcon } from "../../asset/sideMenuIcon/Edit.svg";

import { ReactComponent as NoteIcon } from "../../asset/sideMenuIcon/Note.svg";
import { ReactComponent as TrashIcon } from "../../asset/sideMenuIcon/Trash.svg";
import { ReactComponent as RemindIcon } from "../../asset/sideMenuIcon/Remind.svg";
import { ReactComponent as ArchiveIcon } from "../../asset/sideMenuIcon/Archive.svg";

import "./SideMenu.scss";
export default function SideMenu(props) {
  const dispatch = useDispatch();
  const { isListActive } = useSelector((state) => state.menu);

  const arrLabel = useSelector((state) => state.note.arrLabel);

  const [listClass, setListClass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const renderLabels = () => {
    return arrLabel?.map((label) => {
      return (
        <Link to={`/labels/${label._id}`} key={label._id}>
          <li
            className="list-item__item "
            id={label.label_name}
            title={label.label_name}
          >
            <div className="item__content">
              <img src={labelIcon} alt="..." />
              <span>{label.label_name}</span>
            </div>
          </li>
        </Link>
      );
    });
  };

  useEffect(() => {
    const action = getLabels();
    dispatch(action);

    if (isListActive) {
      setListClass("active");
    } else {
      setListClass("");
    }

    for (let item of document.querySelectorAll(".list-item__item")) {
      item.classList.remove("active");
    }
    document.getElementById(`${props.active}`)?.classList.add("active");
  }, [dispatch, isListActive, props.active]);

  return (
    <div className="sideMenu">
      <ul className={`list-item ${listClass}`}>
        <Link to="/">
          <li className="list-item__item" id="notes" title="Home Page">
            <div className="item__content">
              <NoteIcon />
              <span>Notes</span>
            </div>
          </li>
        </Link>
        <Link to="/reminder">
          <li className="list-item__item " id="reminders" title="Reminder Page">
            <div className="item__content">
              <RemindIcon />
              <span>Reminders</span>
            </div>
          </li>
        </Link>

        {renderLabels()}

        <li
          className="list-item__item "
          id="item3"
          onClick={() => {
            setModalOpen(true);
          }}
          title="Create Label"
        >
          <div className="item__content">
            <EditIcon />
            <span>Create Label</span>
          </div>
        </li>

        <Link to={"/archive"}>
          <li className="list-item__item " id="archive" title="Archive Page">
            <div className="item__content">
              <ArchiveIcon />
              <span>Archive</span>
            </div>
          </li>
        </Link>
        <Link to="/trash">
          <li className="list-item__item " id="trash" title="Trash Page">
            <div className="item__content">
              <TrashIcon />
              <span>Trash</span>
            </div>
          </li>
        </Link>
      </ul>
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          children={<CreateLabels setOpenModal={setModalOpen} />}
        />
      )}
    </div>
  );
}
