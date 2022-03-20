import { CHANGE_LIST_CLASS } from "../type/menuType";

const stateDefaut = {
  isListActive: true,
};

export const MenuReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case CHANGE_LIST_CLASS: {
      state.isListActive = action.isListActive;
      return { ...state };
    }

    default:
      return { ...state };
  }
};