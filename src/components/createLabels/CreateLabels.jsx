import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import deleteIcon from "../../asset/menuTopIcon/delete.svg";
import useOnClickOutside from "../../hook/useClickOutside";

import { createLabels } from "../../redux/action/LabelAction";

import "./CreateLables.scss";

export default function CreateLabels(props) {
  const createRef = useRef();
  const dispatch = useDispatch();
  const editLabelRef = useRef();
  const [label, setLabel] = useState("");

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const addLabel = async () => {
    props.setOpenModal(false);
    if (label.length > 0) {
      const action = createLabels;
      await dispatch(action({ label_name: label }));
      createRef.current.value = "";
    }
  };

  useOnClickOutside(editLabelRef, async () => {
    props.setOpenModal(false);
    if (label.length > 0) {
      const action = createLabels;
      await dispatch(action({ label_name: label }));
      createRef.current.value = "";
    }
  });

  return (
    <div className="create-labels" ref={editLabelRef}>
      <form onSubmit={addLabel}>
        <div className="create-labels__title">
          <p>Create labels</p>
          <img
            src={deleteIcon}
            alt=".."
            onClick={() => {
              props.setOpenModal(false);
            }}
          />
        </div>
        <div className="create-labels-wrap">
          <div className="create-labels__cre">
            <input
              ref={createRef}
              placeholder="Create new label"
              onChange={onLabelChange}
            />
          </div>

          <div className="create-labels__footer">
            <button onClick={addLabel}>Done</button>
          </div>
        </div>
      </form>
    </div>
  );
}
