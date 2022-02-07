import React from "react";

import Menu from "../../components/menu/Menu";
import SideMenu from "../../components/sideMenu/SideMenu";

import "./Archive.scss";

export default function Archive() {
  return (
    <div>
      <Menu title="Archive" />
      <div className="bodyContent">
        <div className="left">
          <SideMenu active="archive" />
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
