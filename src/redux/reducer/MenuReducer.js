import { ADDACTIVECLASS, CHANGELISTCLASS } from "../type/MenuType";

const stateDefaut = {
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
