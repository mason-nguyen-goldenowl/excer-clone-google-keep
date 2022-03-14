import React, { useRef } from "react";
import useOnClickOutside from "../../hook/useClickOutside";
import deleteIcon from "../../asset/menuTopIcon/delete.svg";
import { useNavigate, useParams } from "react-router-dom";
import "./EdiitLabel.scss";
import { useDispatch } from "react-redux";
import { editLabel } from "../../redux/action/LabelAction";

export default function EditLabel(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const labelName = useParams();
  const editLabelRef = useRef();
  const inpuEditRef = useRef();

  const editLabelAction = () => {
    let changeLabel = inpuEditRef.current.value;
    props.setOpenModal(false);
    if (changeLabel.length > 0) {
      const action = editLabel;
      dispatch(
        action({
          label_name: props.label_name,

          labelChange: changeLabel,
        })
      );
      navigate(`/labels/${changeLabel}`);
    }
  };
  useOnClickOutside(editLabelRef, () => {
    let changeLabel = inpuEditRef.current.value;
    props.setOpenModal(false);
    if (changeLabel.length > 0) {
      const action = editLabel;
      dispatch(
        action({
          label_name: props.label_name,

          labelChange: changeLabel,
        })
      );
      navigate(`/labels/${changeLabel}`);
    }
  });
  return (
    <div className="edit-labels" ref={editLabelRef}>
      <form onSubmit={editLabelAction}>
        <div className="edit-labels__title">
          <p className="label-name">Change label name</p>
          <img
            src={deleteIcon}
            alt=".."
            onClick={() => {
              props.setOpenModal(false);
            }}
          />
        </div>
        <div className="edit-labels__body">
          <input ref={inpuEditRef} type="text" placeholder="New label name" />
        </div>
        <div className="edit-labels__footer">
          <button className="btn-bg" onClick={editLabelAction}>
            Change
          </button>
        </div>
      </form>
    </div>
  );
}
