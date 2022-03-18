import googleKeepApi from "../../axios/googleKeepApi";
import Swal from "sweetalert2";
import {
  ADD_NOTE,
  ARCHIVE_NOTE,
  DELETE_NOTE,
  EMPTY_TRASH,
  GET_NOTE,
  REMOVE_NOTE,
  RESTORE,
} from "../type/NoteType";

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
      Swal.fire({
        icon: "success",
        title: "Your note has been archived",
        showConfirmButton: false,
        timer: 1500,
      });
      const result = await googleKeepApi.archiveNote(note);

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
      Swal.fire({
        icon: "success",
        title: "Your note has been created",
        showConfirmButton: false,
        timer: 1500,
      });
      const result = await googleKeepApi.createNote(note);
      dispatch({
        type: ADD_NOTE,
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
      Swal.fire({
        icon: "success",
        title: "Your note has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      const result = await googleKeepApi.deleteNote(note);
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
      Swal.fire({
        icon: "success",
        title: "Your note has been restored",
        showConfirmButton: false,
        timer: 1500,
      });
      const result = await googleKeepApi.restoreNote(note);

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
      Swal.fire({
        icon: "success",
        title: "Your note has been removed",
        showConfirmButton: false,
        timer: 1500,
      });
      const result = await googleKeepApi.removeNote(note);
      console.log(result);
      dispatch({
        type: REMOVE_NOTE,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const emptyTrash = () => {
  return async (dispatch) => {
    try {
      Swal.fire({
        icon: "success",
        title: "Your trash has been emptied",
        showConfirmButton: false,
        timer: 3000,
      });
      const result = await googleKeepApi.emptyTrash();
      dispatch({
        type: EMPTY_TRASH,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
