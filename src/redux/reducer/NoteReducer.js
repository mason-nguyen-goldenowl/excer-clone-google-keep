import {
  ADD_LABEL,
  ADD_NOTE,
  ARCHIVE_NOTE,
  UPDATE_LABEL,
  DELETE_NOTE,
  EMPTY_TRASH,
  DELETE_FOREVER,
  RESTORE,
} from "../type/NoteType";
import { REHYDRATE } from "redux-persist";

const stateDefaut = {
  arrNote: [],
  arrLabel: [],
  arrRemind: [],
  arrArchive: [],
  arrTrash: [],
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case REHYDRATE: {
      const arrNoteLocal = action.payload.note.arrNote;
      const arrLabelLocal = action.payload.note.arrLabel;
      const arrRemindLocal = action.payload.note.arrRemind;
      const arrArchiveLocal = action.payload.note.arrArchive;
      const arrTrashLocal = action.payload.note.arrTrash;
      console.log(arrTrashLocal);
      state.arrNote = arrNoteLocal;

      state.arrLabel = arrLabelLocal;
      state.arrRemind = arrRemindLocal;
      state.arrArchive = arrArchiveLocal;
      state.arrTrash = arrTrashLocal;
      return { ...state };
    }

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

      if (action.noteItem.timeLeft > 0) {
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
    case DELETE_NOTE: {
      state.arrTrash.push(action.noteDelete);
      let idArchiveIndex = state.arrArchive.findIndex(
        (note) => note === action.noteDelete
      );
      state.arrArchive.splice(idArchiveIndex, 1);
      let idNote = state.arrNote.findIndex(
        (note) => note === action.noteDelete
      );
      state.arrNote.splice(idNote, 1);

      let idRemind = state.arrRemind.findIndex(
        (note) => note === action.noteDelete
      );
      state.arrRemind.splice(idRemind, 1);
      return { ...state };
    }
    case ARCHIVE_NOTE: {
      let idArchiveIndex = state.arrArchive.findIndex(
        (note) => note === action.noteArchive
      );
      console.log(action.noteArchive.timeLeft > 0);
      if (idArchiveIndex === -1) {
        state.arrArchive.push(action.noteArchive);

        let idArchiveFromNoteIndex = state.arrNote.findIndex(
          (note) => note === action.noteArchive
        );
        state.arrNote.splice(idArchiveFromNoteIndex, 1);
        let idArchiveFromReminderIndex = state.arrRemind.findIndex(
          (note) => note === action.noteArchive
        );
        state.arrRemind.splice(idArchiveFromReminderIndex, 1);
      } else {
        state.arrArchive.splice(idArchiveIndex, 1);
        state.arrNote.push(action.noteArchive);
        if (action.noteArchive.timeLeft > 0) {
          state.arrRemind.push(action.noteArchive);
        }
      }

      return { ...state };
    }
    case EMPTY_TRASH: {
      state.arrTrash = [];
      return { ...state };
    }
    case DELETE_FOREVER: {
      let idForever = state.arrTrash.findIndex(
        (note) => note === action.noteDeleteForever
      );
      state.arrTrash.splice(idForever, 1);
      return { ...state };
    }
    case RESTORE: {
      state.arrNote.push(action.noteRestore);
      let idRestore = state.arrTrash.findIndex(
        (note) => note === action.noteRestore
      );
      state.arrTrash.splice(idRestore, 1);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
