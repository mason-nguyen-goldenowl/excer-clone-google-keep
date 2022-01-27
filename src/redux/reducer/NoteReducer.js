import { ADD_LABEL, ADD_NOTE, UPDATE_LABEL } from "../type/NoteType";

const stateDefaut = {
  arrNote: [],
  arrLabel: [],
  arrRemind: [],
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case ADD_NOTE: {
      let isAcept = true;
      let j = 0;
      let preTitle = action.noteItem.title;

      state.arrNote.forEach((item, i) => {
        if (item.title === action.noteItem.title) {
          j++;
          action.noteItem.title = preTitle + "(" + j + ")";
        }
      });
      action.noteItem.id = action.noteItem.title;

      state.arrNote.push(action.noteItem);

      if (action.timeLeft > 0) {
        state.arrRemind.push(action.noteItem);
      }

      return { ...state };
    }
    case ADD_LABEL: {
      state.arrLabel.push(action.label);
      return { ...state };
    }
    case UPDATE_LABEL: {
      state.arrLabel = [...action.arrLabelUpdate];
      return { ...state };
    }
    default:
      return { ...state };
  }
};
