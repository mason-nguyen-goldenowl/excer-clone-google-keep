import {
  ADDLABEL,
  ADDNOTE,
  ARCHIVENOTE,
  UPDATELABEL,
  DELETENOTE,
  EMPTYTRASH,
  DELETEFOREVER,
  RESTORE,
  SEARCH,
  DELETELABEL,
} from "../type/NoteType";
import { REHYDRATE } from "redux-persist";
const stateDefaut = {
  arrNote: [],
  arrLabel: [],
  arrRemind: [],
  arrArchive: [],
  arrTrash: [],
  arrSearch: [],
  label: [],
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case REHYDRATE: {
      const arrNoteLocal = action.payload.note?.arrNote;
      const arrLabelLocal = action.payload.note?.arrLabel;
      const arrRemindLocal = action.payload.note?.arrRemind;
      const arrArchiveLocal = action.payload.note?.arrArchive;
      const arrTrashLocal = action.payload.note?.arrTrash;

      state.arrNote = arrNoteLocal;

      state.arrLabel = arrLabelLocal;
      state.arrRemind = arrRemindLocal;
      state.arrArchive = arrArchiveLocal;
      state.arrTrash = arrTrashLocal;
      return { ...state };
    }

    case ADDNOTE: {
      state.arrNote.push(action.noteItem);

      if (action.noteItem.timeLeft > 0) {
        state.arrRemind.push(action.noteItem);
      }
      if (action.noteItem.label) {
        let labelArrName = "arr" + action.label;
        state[labelArrName].push(action.noteItem);
      }
      return { ...state };
    }
    case ADDLABEL: {
      state.arrLabel.push(action.label);
      return { ...state };
    }

    case ARCHIVENOTE: {
      let idArchive = state.arrArchive.findIndex(
        (note) => note === action.noteArchive
      );

      if (idArchive === -1) {
        state.arrArchive.push(action.noteArchive);

        let idArchiveFromNote = state.arrNote.findIndex(
          (note) => note === action.noteArchive
        );
        state.arrNote.splice(idArchiveFromNote, 1);
        let idArchiveFromReminder = state.arrRemind.findIndex(
          (note) => note === action.noteArchive
        );
        state.arrRemind.splice(idArchiveFromReminder, 1);
      } else {
        state.arrArchive.splice(idArchive, 1);
        state.arrNote.push(action.noteArchive);
        if (action.noteArchive.timeLeft > 0) {
          state.arrRemind.push(action.noteArchive);
        }
      }

      return { ...state };
    }
    case DELETENOTE: {
      state.arrTrash.push(action.noteDelete);
      let idArchive = state.arrArchive.findIndex(
        (note) => note === action.noteDelete
      );
      state.arrArchive.splice(idArchive, 1);
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
    case EMPTYTRASH: {
      state.arrTrash = [];
      return { ...state };
    }
    case DELETEFOREVER: {
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

    case SEARCH: {
      let searchInNote = state.arrNote.filter((note) =>
        note.title.toLowerCase().includes(action.searchInput.toLowerCase())
      );
      let searchInArchive = state.arrArchive.filter((note) =>
        note.title.toLowerCase().includes(action.searchInput.toLowerCase())
      );
      state.arrSearch = [...searchInArchive, ...searchInNote];

      return { ...state };
    }
    case UPDATELABEL: {
      let idLabel = state.arrLabel.findIndex(
        (label) => label === action.labelUpdate
      );
      state.arrLabel[idLabel] = action.item;

      return { ...state };
    }
    case DELETELABEL: {
      let idLabel = state.arrLabel.findIndex(
        (label) => label === action.labelDelete
      );
      console.log("dele", idLabel);
      state.arrLabel.splice(idLabel, 1);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
