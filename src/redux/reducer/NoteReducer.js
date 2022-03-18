import {
  ADD_LABEL,
  ADD_NOTE,
  ARCHIVE_NOTE,
  UPDATE_LABEL,
  DELETE_NOTE,
  EMPTY_TRASH,
  DELETE_FOREVER,
  RESTORE,
  SEARCH,
  DELETE_LABEL,
} from "../type/NoteType";

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
    case ADD_NOTE: {
      let j = 0;
      let preTitle = action.noteItem.title;

      state.arrNote.forEach((item, i) => {
        if (item.title === action.noteItem.title) {
          j++;
          action.noteItem.title = preTitle + "(" + j + ")";
        }
      });
      action.noteItem.id = action.noteItem.title;

      if (action.noteItem.timeLeft > 0) {
        state.arrRemind.push(action.noteItem);
      }
      if (action.noteItem.label) {
        let labelArrName = "arr" + action.label;
        state[labelArrName].push(action.noteItem);
      }

      return { ...state };
    }
    case ADD_LABEL: {
      state.arrLabel.push(action.label);
      return { ...state };
    }

    case ARCHIVE_NOTE: {
      let idArchiveIndex = state.arrArchive.findIndex(
        (note) => note === action.noteArchive
      );

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

    case DELETE_NOTE: {
      state.arrTrash.push(action.noteDelete);
      let idArchiveIndex = state.arrArchive.findIndex(
        (note) => note === action.noteDelete
      );
      state.arrArchive.splice(idArchiveIndex, 1);
      let idNoteIndex = state.arrNote.findIndex(
        (note) => note === action.noteDelete
      );
      state.arrNote.splice(idNoteIndex, 1);

      let idRemindIndex = state.arrRemind.findIndex(
        (note) => note === action.noteDelete
      );
      state.arrRemind.splice(idRemindIndex, 1);
      return { ...state };
    }

    case EMPTY_TRASH: {
      state.arrTrash = [];
      return { ...state };
    }
    case DELETE_FOREVER: {
      let idForeverIndex = state.arrTrash.findIndex(
        (note) => note === action.noteDeleteForever
      );
      state.arrTrash.splice(idForeverIndex, 1);
      return { ...state };
    }
    case RESTORE: {
      state.arrNote.push(action.noteRestore);
      let idRestoreIndex = state.arrTrash.findIndex(
        (note) => note === action.noteRestore
      );
      state.arrTrash.splice(idRestoreIndex, 1);
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

    case UPDATE_LABEL: {
      let idLabelIndex = state.arrLabel.findIndex(
        (label) => label === action.labelUpdate
      );
      state.arrLabel[idLabel] = action.item;

      return { ...state };
    }
    case DELETE_LABEL: {
      let idLabelIndex = state.arrLabel.findIndex(
        (label) => label === action.labelDelete
      );

      state.arrLabel.splice(idLabelIndex, 1);
      return { ...state };
    }

    default:
      return { ...state };
  }
};
