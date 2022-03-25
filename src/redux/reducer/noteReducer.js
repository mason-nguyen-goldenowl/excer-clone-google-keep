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
  GET_LABEL_NAME,
  CLEAR_LABEL_NAME,
} from "../type/noteType";

import { LOG_OUT } from "../type/userType";

const stateDefaut = {
  arrNote: [],
  arrSearch: [],
  label: [],
  labelName: "",
  isLoaded: false,
};

export const NoteReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case GET_NOTE: {
      state.arrNote = action.arrNote.reverse();
      state.isLoaded = action.isLoaded;
      return { ...state };
    }
    case ADD_NOTE: {
      state.arrNote = action.newArrNote.reverse();
      state.arrLabel = action.newArrLabel;
      return { ...state };
    }

    case ARCHIVE_NOTE: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case EDIT_NOTE: {
      state.arrNote = action.newArrNote.reverse();
      state.arrLabel = action.newArrLabel;
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
    case CLEAR_LABEL_NAME: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case RESTORE: {
      state.arrNote = action.newArrNote.reverse();
      return { ...state };
    }

    case SEARCH: {
      state.arrSearch = action.arrSearch;

      return { ...state };
    }

    case GET_LABELS: {
      state.arrLabel = action.arrLabels;
      return { ...state };
    }

    case GET_LABEL_NAME: {
      state.labelName = action.labelName;
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
