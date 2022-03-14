import {
  ADD_LABEL,
  ADD_NOTE,
  ARCHIVE_NOTE,
  UPDATE_LABEL,
  DELETE_NOTE,
  EMPTY_TRASH,
  RESTORE,
  SEARCH,
  DELETE_LABEL,
  GET_NOTE,
  GET_LABELS,
  REMOVE_NOTE,
  EDIT_NOTE,
  CLEAR_REMIND,
} from "../type/NoteType";
import { LOG_OUT } from "../type/UserType";

const stateDefaut = {
  arrNote: [],
  arrSearch: [],
  label: [],
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case GET_NOTE: {
      state.arrNote = action.arrNote.reverse();
      return { ...state };
    }
    case ADD_NOTE: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case ARCHIVE_NOTE: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case EDIT_NOTE: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case CLEAR_REMIND: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case DELETE_NOTE: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case EMPTY_TRASH: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case REMOVE_NOTE: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case RESTORE: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case SEARCH: {
      let searchInNote = state.arrNote.filter((note) =>
        note.title.toLowerCase().includes(action.searchInput.toLowerCase())
      );

      state.arrSearch = [...searchInNote];

      return { ...state };
    }

    case GET_LABELS: {
      state.arrLabel = action.arrLabels;
      return { ...state };
    }

    case ADD_LABEL: {
      state.arrLabel = action.newArrLabel;
      return { ...state };
    }

    case UPDATE_LABEL: {
      state.arrLabel = action.newArrLabel;
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case DELETE_LABEL: {
      state.arrLabel = action.newArrLabel;
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }
    case LOG_OUT: {
      state.arrNote = [];
      state.arrLabel = [];
      return { ...state };
    }
    default:
      return { ...state };
  }
};
