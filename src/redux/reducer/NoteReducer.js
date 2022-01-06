import { ADDLABEL, ADDNOTE, UPDATELABEL } from "../type/NoteType";

const stateDefaut = {
  arrNote: [],
  arrLabel: [],
  arrRemind: [],
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case ADDNOTE: {
      state.arrNote.push(action.noteItem);

      if (action.timeLeft > 0) {
        state.arrRemind.push(action.noteItem);
      }
      return { ...state };
    }
    case ADDLABEL: {
      state.arrLabel.push(action.label);
      return { ...state };
    }
    case UPDATELABEL: {
      state.arrLabel = [...action.arrLabelUpdate];
      return { ...state };
    }
    default:
      return { ...state };
  }
};
