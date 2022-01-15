import { ADD_NOTE } from "../type/NoteType";

const stateDefaut = {
  arrNote: [],
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case ADD_NOTE: {
      state.arrNote.push(action.noteItem);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
