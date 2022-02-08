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
      let remindTime = new Date(action.noteItem.remind).getTime();
      let now = new Date().getTime();
      let remainingTime = remindTime - now;
      if (remainingTime > 0) {
        state.arrRemind.push(action.noteItem);
      }
      state.arrNote.push(action.noteItem);

      return { ...state };
    }

    case ADD_LABEL: {
      state.arrLabel.push(action.label);
      return { ...state };
    }

    case ARCHIVE_NOTE: {
      let idArchive = state.arrArchive.findIndex(
        (note) => note === action.noteArchive
      );
      let remindTime = new Date(action.noteArchive.remind).getTime();
      let now = new Date().getTime();
      let remainingTime = remindTime - now;
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
        if (remainingTime > 0) {
          state.arrRemind.push(action.noteArchive);
        }
      }

      return { ...state };
    }

    case DELETE_NOTE: {
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
      let idLabel = state.arrLabel.findIndex(
        (label) => label === action.labelUpdate
      );
      state.arrLabel[idLabel] = action.item;
      let noteLabelUpdate = state.arrNote.filter(
        (note) => note.label === action.labelUpdate
      );
      console.log(noteLabelUpdate);
      for (let note of state.arrNote) {
        noteLabelUpdate.map((noteUpdate) => {
          if (note === noteUpdate) {
            note.label = action.item;
          }
        });
      }

      return { ...state };
    }

    case DELETE_LABEL: {
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
