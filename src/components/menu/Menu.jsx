import React, { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";

import close from "../../asset/menuTopIcon/delete.svg";
import search from "../../asset/menuTopIcon/search.svg";
import refresh from "../../asset/menuTopIcon/refresh.svg";
import logo from "../../asset/menuTopIcon/pngwing.com.png";
import gridIcon from "../../asset/menuTopIcon/gridIcon.svg";
import settings from "../../asset/menuTopIcon/settings.svg";

import { SEARCH } from "../../redux/type/NoteType";
import { LOG_OUT } from "../../redux/type/UserType";
import { CHANGE_LIST_CLASS } from "../../redux/type/MenuType";
import "./Menu.scss";

export default function Menu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let alphabet;
  const fName = useSelector((state) => state.user.user.full_name);
  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef("");

  if (fName) {
    alphabet = fName[0].toUpperCase();
  }

  const [isListActive, setIsListActive] = useState(false);

  const handleChangeInput = () => {
    setSearchInput(searchRef.current.value);
    console.log(searchInput);
    dispatch({
      type: SEARCH,
      searchInput,
    });
  };

  const logOut = async () => {
    try {
      await Cookies.remove("refresh_token");
      await Cookies.remove("access_token");
      await Cookies.remove("isLogged");
      localStorage.removeItem("access_token");
      navigate("/login");
      await dispatch({
        type: LOG_OUT,
      });
    } catch (error) {
      console.log(error);
    }
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
              <img src={logo} alt="..." />
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
              <div>{alphabet}</div>
            </div>
            <div className="profile-menu">
              <ul>
                <li>Profile</li>
                <li onClick={logOut}>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
