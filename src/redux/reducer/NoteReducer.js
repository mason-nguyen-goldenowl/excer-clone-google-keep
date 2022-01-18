import { ADD_NOTE } from "../type/NoteType";

const stateDefaut = {
  arrNote: [],
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
      console.log(state.arrNote);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
