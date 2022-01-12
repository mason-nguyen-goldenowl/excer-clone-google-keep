import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import check from "../../asset/editorIcon/check.svg";
import labelIcon from "../../asset/editorIcon/label.svg";
import edit from "../../asset/editorIcon/edit.svg";
import deleteIcon from "../../asset/menuTopIcon/delete.svg";
import { ADDLABEL, DELETELABEL, UPDATELABEL } from "../../redux/type/NoteType";
import "./EditLables.scss";
import useOnClickOutside from "../../hook/useClickOutside";
export default function EditLabels(props) {
  const dispatch = useDispatch();
  const { arrLabel } = useSelector((state) => state.note);
  const editLabelRef = useRef();
  const [label, setLabel] = useState("");

  let arrLabelUpdate = [...arrLabel];

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const renderLabel = () => {
    return arrLabel.map((item, index) => {
      let changeLabel = item;
      const onInputChange = (e) => {
        item = e.target.value;
      };
      arrLabelUpdate[index] = item;

      return (
        <div className="label__item" key={index}>
          <div className="icon">
            <img className="labelIcon" src={labelIcon} alt=".." />
            <img
              className="deleteIcon"
              src={deleteIcon}
              alt=".."
              onClick={() => {
                dispatch({
                  type: DELETELABEL,
                  labelDelete: item,
                });
              }}
            />
          </div>
          <p>{item}</p>
          <input onChange={onInputChange} />
          <div className="iconEdit">
            <img className="editIcon" src={edit} alt=".." />
            <img
              className="checkIcon"
              src={check}
              alt=".."
              onClick={() => {
                dispatch({
                  type: UPDATELABEL,
                  labelUpdate: changeLabel,
                  item,
                });
              }}
            />
          </div>
        </div>
      );
    });
  };
  useOnClickOutside(editLabelRef, () => props.setOpenModal(false));
  console.log(editLabelRef);
  return (
    <div className="editLabels" ref={editLabelRef}>
      <div className="editLabels__title">
        <p>Edit labels</p>
        <img
          src={deleteIcon}
          alt=".."
          onClick={() => {
            props.setOpenModal(false);
          }}
        />
      </div>
      <div className="editLabels-wrap">
        <div className="editLabels__cre">
          <input placeholder="Create new label" onChange={onLabelChange} />
          <div
            className="cre__btn"
            onClick={() => {
              dispatch({
                type: ADDLABEL,
                label,
              });
              setLabel("");
            }}
          >
            <img src={check} alt="..." />
          </div>
        </div>
        <div className="editLabels__body">{renderLabel()}</div>
        <hr></hr>
        <div className="editLabels__footer">
          <button
            onClick={() => {
              dispatch({
                type: UPDATELABEL,
                arrLabelUpdate,
              });
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
