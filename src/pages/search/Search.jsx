import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import SideMenu from "../../components/sideMenu/SideMenu";

const Search = () => {
  const { arrSearch } = useSelector((state) => state.note);

  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  let navigate = useNavigate();

  const renderNoteCard = () => {
    return arrSearch.map((note) => {
      return <NoteCard content={note} key={note._id} />;
    });
  };
  useEffect(() => {
    if (!isLogged || !refreshToken) {
      navigate("/login");
    }
  }, [arrSearch, isLogged, navigate, refreshToken]);

  return (
    <div>
      <Menu title="Search" />
      <div className="body-content">
        <div className="left">
          <SideMenu active="" />
        </div>
        <div className="right">
          <div className="note__content">
            {arrSearch.length === 0 ? <p>No result</p> : renderNoteCard()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
