import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CHANGE_LIST_CLASS } from "../../redux/type/MenuType";
import gridIcon from "../../asset/menuTopIcon/gridIcon.svg";
import search from "../../asset/menuTopIcon/search.svg";
import close from "../../asset/menuTopIcon/delete.svg";
import refresh from "../../asset/menuTopIcon/refresh.svg";
import settings from "../../asset/menuTopIcon/settings.svg";
import "./Menu.scss";

export default function Menu() {
  const dispatch = useDispatch();
  const logoURL =
    "https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png";
  const { menuTitle } = useSelector((state) => state.MenuReducer);
  const [isListActive, setIsListActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="menu-wrapter">
      <div className="menu">
        <div className="menu__items">
          <div className="menu__logo">
            <div>
              <div
                href="#"
                className="menu__btn"
                onClick={() => {
                  setIsListActive(!isListActive);
                  dispatch({
                    type: CHANGE_LIST_CLASS,
                    isListActive,
                  });
                }}
              >
                <svg focusable="false" viewBox="0 0 24 24">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
              </div>
            </div>
            <div className="menu-title">
              <img src={logoURL} alt="..." />
              <span>{menuTitle}</span>
            </div>
          </div>
          <div className="menu__search">
            <div className="search__input">
              <div className="search__wrap">
                <a className="menu__btn" href="#">
                  <img src={search} alt="..." />
                </a>
                <input placeholder="Search" />
                <a className="menu__btn close" href="#">
                  <img src={close} alt="..." />
                </a>
              </div>
            </div>
            <div className="settings">
              <a className="menu__btn" href="#">
                <img src={refresh} alt=".." />
              </a>
              <a className="menu__btn" href="#">
                <img src={gridIcon} alt="..." />
              </a>
              <a className="menu__btn" href="#">
                <img src={settings} alt="..." />
              </a>
            </div>
          </div>
          <div className="menu__acount">
            <div>
              <a className="menu__btn" href="#">
                <svg class="gb_Pe" focusable="false" viewBox="0 0 24 24">
                  <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                </svg>
              </a>
            </div>

            <div className="avt-wrap">
              <a href="#">M</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
