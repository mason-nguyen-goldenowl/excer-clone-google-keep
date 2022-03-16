import React, { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { editLabel } from "../../redux/action/LabelAction";
import useOnClickOutside from "../../hook/useClickOutside";
import deleteIcon from "../../asset/menuTopIcon/delete.svg";

import "./EdiitLabel.scss";

export default function EditLabel(props) {
  const inpuEditRef = useRef();
  const labelName = useParams();
  const editLabelRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changeLabel, setChangeLabel] = useState(props.label_name);
  const [textChanged, setTextChanged] = useState(true);

  const editLabelAction = () => {
    props.setOpenModal(false);
    if (changeLabel !== props.label_name) {
      const action = editLabel;
      dispatch(
        action({
          label_id: props.label_id,

          labelChange: changeLabel,
        })
      );
      navigate(`/labels/${props.label_id}`);
    }
  };

  useOnClickOutside(editLabelRef, editLabelAction);

  return (
    <div className="edit-labels" ref={editLabelRef}>
      <form onSubmit={editLabelAction}>
        <div className="edit-labels__title">
          <p className="label-name">Change label name</p>
          <img
            style={{ cursor: "pointer" }}
            src={deleteIcon}
            alt=".."
            onClick={() => {
              props.setOpenModal(false);
            }}
          />
        </div>
        <div className="edit-labels__body">
          <input
            ref={inpuEditRef}
            onChange={(e) => {
              setChangeLabel(e.target.value);
              if (changeLabel !== labelName.id) {
                setTextChanged(false);
              }
            }}
            type="text"
            value={changeLabel}
            placeholder="New label name"
          />
        </div>
        <div className="edit-labels__footer">
          <Button
            disabled={textChanged}
            className="btn-bg"
            onClick={editLabelAction}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
