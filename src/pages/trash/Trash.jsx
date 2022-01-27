import React from "react";

import Menu from "../../components/menu/Menu";
import SideMenu from "../../components/sideMenu/SideMenu";

import "./Trash.scss";

export default function Trash() {
  return (
    <div>
      <Menu title="Trash" />
      <div className="bodyContent">
        <div className="left">
          <SideMenu active="trash" />
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
