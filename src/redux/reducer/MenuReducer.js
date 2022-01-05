import { ADDACTIVECLASS, CHANGELISTCLASS } from "../type/MenuType";

const stateDefaut = {
  arrSideMenu: [],
  menuTitle: "Keep",
  idMenuItemActive: "item1",
  isListActive: true,
};

export const MenuReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case ADDACTIVECLASS: {
      state.idMenuItemActive = action.idActive;
      state.menuTitle = action.title;
      state.logoURL = action.logoURL;
      return { ...state };
    }
    case CHANGELISTCLASS: {
      state.isListActive = action.isListActive;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
