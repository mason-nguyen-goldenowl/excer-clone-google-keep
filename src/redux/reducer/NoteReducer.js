import { ADD_LABEL, ADD_NOTE, UPDATE_LABEL } from "../type/NoteType";

const stateDefaut = {
  arrNote: [],
  arrLabel: [],
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case ADD_NOTE: {
      state.arrNote.push(action.noteItem);
      return { ...state };
    }
    case ADD_LABEL: {
      state.arrLabel.push(action.label);
      return { ...state };
    }
    case UPDATE_LABEL: {
      state.arrLabel = [...action.arrLabelUpdate];
    }
    default:
      return { ...state };
  }
};
