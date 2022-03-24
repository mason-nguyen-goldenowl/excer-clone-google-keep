import googleKeepApi from "../../axios/googleKeepApi";
import Swal from "sweetalert2";

import {
  ADD_NOTE,
  ARCHIVE_NOTE,
  CLEAR_LABEL_NAME,
  CLEAR_REMIND,
  DELETE_NOTE,
  EDIT_NOTE,
  EMPTY_TRASH,
  GET_NOTE,
  REMOVE_NOTE,
  RESTORE,
  SEARCH,
} from "../type/noteType";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  background: "#000",
  margin: "20px ",
  iconColor: "#ffbb00",
  color: "#ffff",
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const getNoteAction = () => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.getNote();

      dispatch({
        type: GET_NOTE,
        arrNote: result.notes,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const archiveNote = (note) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "warning",
        title: "Your note is archiving",
      });
      const result = await googleKeepApi.archiveNote(note);
      Toast.fire({
        icon: "success",
        title: "Your note has been archived",
      });
      dispatch({
        type: ARCHIVE_NOTE,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Archive note failed",
      });
    }
  };
};
export const unArchiveNote = (note) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "warning",
        title: "Your note is unarchiving",
      });
      const result = await googleKeepApi.archiveNote(note);
      Toast.fire({
        icon: "success",
        title: "Your note has been unarchived",
      });

      dispatch({
        type: ARCHIVE_NOTE,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Unarchive note failed",
      });
    }
  };
};

export const createNote = (note) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "warning",
        title: "Your note is creating",
      });
      const result = await googleKeepApi.createNote(note);
      Toast.fire({
        icon: "success",
        title: "Create note successfully",
      });

      dispatch({
        type: ADD_NOTE,
        newArrLabel: result.newArrLabel,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Create note unsuccessfully",
      });
    }
  };
};

export const searchNote = (note) => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.searchNote(note);
      dispatch({
        type: SEARCH,
        arrSearch: result.notes,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const editNote = (note) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "warning",
        title: "Your note is editing",
      });
      const result = await googleKeepApi.editNote(note);
      Toast.fire({
        icon: "success",
        title: "Your note has been eddited",
      });
      googleKeepApi.getNote();
      dispatch({
        type: EDIT_NOTE,
        newArrNote: result.newArrNote,
        newArrLabel: result.newArrLabel,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Edit note unsuccessfully",
      });
    }
  };
};

export const clearRemindAction = (note) => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.clearRemind(note);
      dispatch({
        type: CLEAR_REMIND,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Cleare remind of note unsuccessfully",
      });
    }
  };
};

export const clearLabelAction = (note) => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.clearLabelName(note);
      dispatch({
        type: CLEAR_LABEL_NAME,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Cleare label of note unsuccessfully",
      });
    }
  };
};

export const clearImageAction = (note) => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.clearImage(note);
      dispatch({
        type: CLEAR_LABEL_NAME,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const deleteNote = (note) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "warning",
        title: "Your note is deleting",
      });
      const result = await googleKeepApi.deleteNote(note);
      Toast.fire({
        icon: "success",
        title: "Your note has been deleted",
      });
      dispatch({
        type: DELETE_NOTE,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const restoreNote = (note) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "warning",
        title: "Your note is restoring",
      });
      const result = await googleKeepApi.restoreNote(note);
      Toast.fire({
        icon: "success",
        title: "Your note has been restored",
      });

      dispatch({
        type: RESTORE,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Restoring unsuccessful",
      });
    }
  };
};

export const removeNote = (note) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "warning",
        title: "Your note is removing",
      });
      const result = await googleKeepApi.removeNote(note);
      Toast.fire({
        icon: "success",
        title: "Your note has been removed",
      });

      dispatch({
        type: REMOVE_NOTE,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Remove note unsuccessful",
      });
    }
  };
};

export const emptyTrash = (arrNoteId) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "warning",
        title: "Your trash will be empty",
      });
      const result = await googleKeepApi.emptyTrash(arrNoteId);
      Toast.fire({
        icon: "success",
        title: "Your trash has been empty",
      });
      dispatch({
        type: EMPTY_TRASH,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Empty trash unsuccessful",
      });
    }
  };
};
