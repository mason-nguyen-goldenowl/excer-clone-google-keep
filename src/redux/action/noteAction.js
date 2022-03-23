import googleKeepApi from "../../axios/googleKeepApi";
import Swal from "sweetalert2";
import { useToast } from "@chakra-ui/react";
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
      console.log(error.response);
    }
  };
};
export const unArchiveNote = (note) => {
  return async (dispatch) => {
    try {
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
      console.log(error.response);
    }
  };
};

export const createNote = (note) => {
  return async (dispatch) => {
    try {
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
        icon: "errpr",
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
      const result = await googleKeepApi.editNote(note);
      Toast.fire({
        icon: "success",
        title: "Your note has been eddited",
      });
      dispatch({
        type: EDIT_NOTE,
        newArrNote: result.newArrNote,
        newArrLabel: result.newArrLabel,
      });
    } catch (error) {
      console.log(error.response);
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
      console.log(error.response);
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
      console.log(error.response);
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
      console.log(error.response);
    }
  };
};

export const removeNote = (note) => {
  return async (dispatch) => {
    try {
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
      console.log(error.response);
    }
  };
};

export const emptyTrash = (arrNoteId) => {
  return async (dispatch) => {
    try {
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
      console.log(error.response);
    }
  };
};
