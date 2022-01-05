import { ADDNOTE } from "../type/NoteType";

const stateDefaut = {
  arrNote: [],
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case ADDNOTE: {
      state.arrNote.push(action.noteItem);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
