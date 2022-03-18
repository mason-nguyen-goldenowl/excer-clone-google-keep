import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import gridIcon from "../../asset/menuTopIcon/gridIcon.svg";
import search from "../../asset/menuTopIcon/search.svg";
import close from "../../asset/menuTopIcon/delete.svg";
import refresh from "../../asset/menuTopIcon/refresh.svg";
import settings from "../../asset/menuTopIcon/settings.svg";

import { CHANGE_LIST_CLASS } from "../../redux/type/MenuType";
import { SEARCH } from "../../redux/type/NoteType";

import "./Menu.scss";

export default function Menu(props) {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef("");

  const logoURL =
    "https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png";

  const [isListActive, setIsListActive] = useState(false);

  const handleChangeInput = () => {
    setSearchInput(searchRef.current.value);
    console.log(searchInput);
    dispatch({
      type: SEARCH,
      searchInput,
    });
  };

  return (
    <div className="menu-wrapter">
      <div className="menu">
        <div className="menu__items">
          <div className="menu__logo">
            <div>
              <div
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
              <span>{props.title}</span>
            </div>
          </div>
          <div className="menu__search">
            <Link to="/search" className="search__input">
              <div className="search__wrap">
                <div className="menu__btn">
                  <img src={search} alt="..." />
                </div>

                <input
                  ref={searchRef}
                  placeholder="Search"
                  onChange={handleChangeInput}
                />

                <div className="menu__btn close">
                  <img src={close} alt="..." />
                </div>
              </div>
            </Link>

            <div className="settings">
              <div className="menu__btn">
                <img src={refresh} alt=".." />
              </div>
              <div className="menu__btn">
                <img src={gridIcon} alt="..." />
              </div>
              <div className="menu__btn">
                <img src={settings} alt="..." />
              </div>
            </div>
          </div>
          <div className="menu__acount">
            <div>
              <div className="menu__btn">
                <svg class="gb_Pe" focusable="false" viewBox="0 0 24 24">
                  <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                </svg>
              </div>
            </div>

            <div className="avt-wrap">
              <div>M</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
