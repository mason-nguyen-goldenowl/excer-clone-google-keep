import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useOnClickOutside from "../../hook/useClickOutside";
import { emptyTrash } from "../../redux/action/noteAction";

import "./Comfirm.scss";

const Comfirm = (props) => {
  const comfirmRef = useRef();
  const dispatch = useDispatch();
  let noteTrashId = [];

  props.trashArr.forEach((note) => {
    noteTrashId.push(note._id);
  });

  const emptyOnClick = () => {
    const action = emptyTrash;
    dispatch(action(noteTrashId));
    props.setOpenModal(false);
  };

  useOnClickOutside(comfirmRef, () => props.setOpenModal(false));

  return (
    <div ref={comfirmRef} className="comfirm">
      <div className="comfirm__ques">
        <p>Empty trash? All notes in Trash will be permanently deleted.</p>
      </div>
      <div className="cofirm__choosing">
        <button
          className="comfirm__cancel"
          onClick={() => {
            props.setOpenModal(false);
          }}
        >
          Cancel
        </button>
        <button className="comfirm__empty" onClick={emptyOnClick}>
          Empty Trash
        </button>
      </div>
    </div>
  );
};

export default Comfirm;
