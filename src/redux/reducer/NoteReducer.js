import { ADDLABEL, ADDNOTE, UPDATELABEL } from "../type/NoteType";

const stateDefaut = {
  arrNote: [],
  arrLabel: [],
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case ADDNOTE: {
      state.arrNote.push(action.noteItem);
      return { ...state };
    }
    case ADDLABEL: {
      state.arrLabel.push(action.label);
      return { ...state };
    }
    case UPDATELABEL: {
      state.arrLabel = [...action.arrLabelUpdate];
    }
    default:
      return { ...state };
  }
};
