import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hook/useClickOutside";
import { deleteLabel } from "../../redux/action/labelAction";

import "./Comfirm.scss";

const Comfirmlabel = (props) => {
  const comfirmRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteLabelAction = () => {
    const action = deleteLabel;
    dispatch(action({ label_id: props.label_id }));

    navigate(`/`);
  };
  useOnClickOutside(comfirmRef, () => props.setOpenModal(false));

  return (
    <div ref={comfirmRef} className="comfirm">
      <div className="comfirm__ques">
        <p>Delete this label?</p>
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
        <button className="comfirm__empty" onClick={deleteLabelAction}>
          Comfirm
        </button>
      </div>
    </div>
  );
};

export default Comfirmlabel;
