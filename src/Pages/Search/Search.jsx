import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Masonry from "react-masonry-component";

import Menu from "../../Components/Menu/Menu";
import NoteCard from "../../Components/NoteCard/NoteCard";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { searchNote } from "../../redux/action/noteAction";

const Search = () => {
  const { arrSearch } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const isLogged = Cookies.get("isLogged");
  const refreshToken = Cookies.get("refresh_token");
  let navigate = useNavigate();
  const action = searchNote;
  const renderNoteCard = () => {
    return arrSearch.map((note) => {
      return (
        <div key={note._id}>
          <NoteCard content={note} />
        </div>
      );
    });
  };

  useEffect(() => {
    if (!isLogged || !refreshToken) {
      navigate("/login");
    }
  }, [isLogged, navigate, refreshToken]);

  return (
    <div>
      <Menu title="Search" />
      <div className="body-content">
        <div className="left">
          <SideMenu active="" />
        </div>
        <div className="right">
          <div className="note__content">
            {arrSearch.length === 0 ? (
              <p>No result</p>
            ) : (
              <Masonry className={"my-gallery-class"}>
                {renderNoteCard()}
              </Masonry>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
