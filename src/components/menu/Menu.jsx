import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import close from "../../asset/menuTopIcon/delete.svg";
import search from "../../asset/menuTopIcon/search.svg";
import refresh from "../../asset/menuTopIcon/refresh.svg";
import logo from "../../asset/menuTopIcon/pngwing.com.png";
import gridIcon from "../../asset/menuTopIcon/gridIcon.svg";
import settings from "../../asset/menuTopIcon/settings.svg";

import { LOG_OUT } from "../../redux/type/UserType";
import { SEARCH } from "../../redux/type/NoteType";
import { CHANGE_LIST_CLASS } from "../../redux/type/MenuType";
import "./Menu.scss";

export default function Menu(props) {
  let alphabet;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fName = useSelector((state) => state.user.user.full_name);
  const [isActive, setIsActive] = useState(false);
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
          </div>
          <div className="menu__acount">
            <div className="profile-menu">
              <span className="btn-nonbg" onClick={logOut}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
