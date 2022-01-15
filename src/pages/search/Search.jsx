import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Menu from "../../components/menu/Menu";
import NoteCard from "../../components/noteCard/NoteCard";
import SideMenu from "../../components/sideMenu/SideMenu";

const Search = () => {
  const { arrSearch } = useSelector((state) => state.note);

  const renderNoteCard = () => {
    return arrSearch.map((note, index) => {
      return <NoteCard content={note} key={index} />;
    });
  };
  useEffect(() => {}, [arrSearch]);

  return (
    <div>
      <Menu title="Search" />
      <div className="bodyContent">
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
