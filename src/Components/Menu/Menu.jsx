import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

import search from "../../asset/menuTopIcon/search.svg";
import logo from "../../asset/menuTopIcon/pngwing.com.png";

import { LOG_OUT } from "../../redux/type/userType";
import { CHANGE_LIST_CLASS } from "../../redux/type/menuType";

import "./Menu.scss";
import { searchNote } from "../../redux/action/noteAction";

export default function Menu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const action = searchNote;
  const searchRef = useRef("");
  const [searchInput, setSearchInput] = useState(null);

  const [isListActive, setIsListActive] = useState(false);

  const debounce = (callback, timeout) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(callback, timeout);
    };
  };

  const handleChangeInput = (e) => {
    if (e.target.value.length === 0) {
      debounce(dispatch(action({ keyWord: null })), 1500);
    }
    debounce(dispatch(action({ keyWord: searchInput })), 1500);
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.length > 0) {
      dispatch(action({ keyWord: searchInput }));
    } else {
      dispatch(action({ keyWord: null }));
    }
  };

  const logOut = async () => {
    try {
      await Cookies.remove("refresh_token");
      await Cookies.remove("access_token");
      await Cookies.remove("isLogged");
      localStorage.removeItem("access_token");
      localStorage.removeItem("sub");
      navigate("/login");
      await dispatch({
        type: LOG_OUT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.title === "Search") {
      searchRef.current.focus();
    }
  }, [props.title]);

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
              <form onSubmit={handleSubmit} className="search__wrap">
                <div className="menu__btn search-btn">
                  <img src={search} alt="..." />
                </div>

                <input
                  ref={searchRef}
                  placeholder="Search"
                  onChange={handleChangeInput}
                />
              </form>
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
