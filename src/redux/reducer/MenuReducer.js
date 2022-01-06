import { ADDACTIVECLASS, CHANGELISTCLASS } from "../type/MenuType";

const stateDefaut = {
  arrSideMenu: [],
  menuTitle: "Keep",
  idMenuItemActive: "item1",
  isListActive: true,
};

export const MenuReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case CHANGELISTCLASS: {
      state.isListActive = action.isListActive;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
