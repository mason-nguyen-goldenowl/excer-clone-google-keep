import { ADD_ACTIVE_CLASS, CHANGE_LIST_CLASS } from "../type/MenuType";

const stateDefaut = {
  arrSideMenu: [],
  menuTitle: "Keep",
  idMenuItemActive: "item1",
  isListActive: true,
};

export const MenuReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case ADD_ACTIVE_CLASS: {
      state.idMenuItemActive = action.idActive;
      state.menuTitle = action.title;
      state.logoURL = action.logoURL;
      return { ...state };
    }
    case CHANGE_LIST_CLASS: {
      state.isListActive = action.isListActive;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
