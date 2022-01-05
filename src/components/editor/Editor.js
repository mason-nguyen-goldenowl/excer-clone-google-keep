import React from "react";
import reminder from "../../asset/editorIcon/reminder.svg";
import pin from "../../asset/editorIcon/pin.svg";
import colab from "../../asset/editorIcon/colab.svg";
import background from "../../asset/editorIcon/background.svg";
import image from "../../asset/editorIcon/image.svg";
import archive from "../../asset/editorIcon/archive.svg";
import more from "../../asset/editorIcon/more.svg";
import undo from "../../asset/editorIcon/undo.svg";
import "./Editor.scss";

export default function Editor() {
  return (
    <div className="editor">
      <div className="editorTitle">
        <input placeholder="Title" />
        <div className="editorTitle__icon">
          <span>
            <img src={pin} alt=".." />
          </span>
        </div>
      </div>
      <div className="editorText">
        <input placeholder="Take a note..." />
      </div>
      <div className="editorFeature">
        <div className="editorFeature__icon">
          <ul className="editorIcon__list">
            <li className="editorIcon__item">
              <a>
                <img src={reminder} alt=".." />
              </a>
            </li>
            <li className="editorIcon__item">
              <a>
                <img src={colab} alt=".." />
              </a>
            </li>
            <li className="editorIcon__item">
              <a>
                <img src={background} alt=".." />
              </a>
            </li>
            <li className="editorIcon__item">
              <a>
                <img src={image} alt=".." />
              </a>
            </li>
            <li className="editorIcon__item">
              <a>
                <img src={archive} alt=".." />
              </a>
            </li>
            <li className="editorIcon__item">
              <a>
                <img src={more} alt=".." />
              </a>
            </li>
            <li className="editorIcon__item">
              <a>
                <img src={undo} alt=".." />
              </a>
            </li>
            <li className="editorIcon__item ">
              <a>
                <img src={undo} alt=".." className="redo" />
              </a>
            </li>
          </ul>
        </div>
        <div className="editorFeature__close">
          <span>Close</span>
        </div>
      </div>
    </div>
  );
}
