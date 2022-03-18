import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useOnClickOutside from "../../hook/useClickOutside";
import { EMPTY_TRASH } from "../../redux/type/NoteType";
import "./Comfirm.scss";
const Comfirm = (props) => {
  const comfirmRef = useRef();
  const dispatch = useDispatch();

  const emptyTrashAction = () => {
    dispatch({
      type: EMPTY_TRASH,
    });
  };

  const emptyOnClick = () => {
    emptyTrashAction();
    props.setOpenModal(false);
  };

  useOnClickOutside(comfirmRef, () => props.setOpenModal(false));

  return (
    <div ref={comfirmRef}>
      <div className="comfirm__ques">
        <p>Empty trash? All notes in Trash will be permanently deleted.</p>
      </div>
      <div className="cofirm__choosing">
        <button
          className="comfirm__cancel"
          onClick={() => {
            props.setIsEmpty(false);
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
