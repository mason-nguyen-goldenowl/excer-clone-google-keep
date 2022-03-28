import googleKeepApi from "../../axios/googleKeepApi";
import Swal from "sweetalert2";
import { getNotes, search, updateNote } from "../features/noteSlice";

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
      dispatch(getNotes({ arrNote: result.notes, isLoaded: true }));
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
      console.log("aa", result);
      Toast.fire({
        icon: "success",
        title: "Your note has been archived",
      });
      dispatch(updateNote({ newArrNote: result.newArrNote.reverse() }));
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

      dispatch(updateNote({ newArrNote: result.newArrNote.reverse() }));
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
      dispatch(
        updateNote({
          newArrNote: result.newArrNote.reverse(),
          newArrLabel: result.newArrLabel.reverse(),
        })
      );
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

      dispatch(search({ arrSearch: result.notes }));
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
      dispatch(
        updateNote({
          newArrNote: result.newArrNote.reverse(),
          newArrLabel: result.newArrLabel.reverse(),
        })
      );
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
      dispatch(updateNote({ newArrNote: result.newArrNote.reverse() }));
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

      dispatch(updateNote({ newArrNote: result.newArrNote.reverse() }));
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Cleare label of note unsuccessfully",
      });
      console.log(error);
    }
  };
};

export const clearImageAction = (note) => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.clearImage(note);
      dispatch(updateNote({ newArrNote: result.newArrNote.reverse() }));
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
      dispatch(updateNote({ newArrNote: result.newArrNote.reverse() }));
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Delete note unsuccessful",
      });
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

      dispatch(updateNote({ newArrNote: result.newArrNote.reverse() }));
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

      dispatch(updateNote({ newArrNote: result.newArrNote.reverse() }));
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
      dispatch(updateNote({ newArrNote: result.newArrNote.reverse() }));
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Empty trash unsuccessful",
      });
    }
  };
};
