import React, { useRef } from "react";

import "./Comfirm.scss";

export default function ComfirmNote(props) {
  const comfirmRef = useRef();

  return (
    <div ref={comfirmRef} className="comfirm">
      <div className="comfirm__ques">
        <p>{props.content}</p>
      </div>
      <div className="cofirm__choosing">
        <button
          className="comfirm__cancel"
          onClick={() => {
            props.setOpenModal(false);
            props.setOpenModalComfirm(false);
          }}
        >
          Cancel
        </button>
        <button className="comfirm__empty" onClick={props.onSubmit}>
          Comfirm
        </button>
      </div>
    </div>
  );
}
