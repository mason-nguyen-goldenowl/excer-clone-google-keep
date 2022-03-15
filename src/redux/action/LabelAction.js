import googleKeepApi from "../../axios/googleKeepApi";
import Swal from "sweetalert2";
import {
  ADD_LABEL,
  DELETE_LABEL,
  GET_LABELS,
  GET_LABEL_NAME,
  UPDATE_LABEL,
} from "../type/NoteType";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const getLabels = () => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.getLabels();
      dispatch({
        type: GET_LABELS,
        arrLabels: result.labels,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getLabelName = (label_id) => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.getLabelName({ label_id });
      dispatch({
        type: GET_LABEL_NAME,
        labelName: result.labelName,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createLabels = (label) => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.createLabel(label);
      Toast.fire({
        icon: "success",
        title: result.message,
      });
      dispatch({
        type: ADD_LABEL,
        newArrLabel: result.newArrLabel,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editLabel = (label) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "success",
        title: "Your label have been updated",
      });
      const result = await googleKeepApi.editLabel(label);

      dispatch({
        type: UPDATE_LABEL,
        newArrLabel: result.newArrLabels,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteLabel = (label) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "success",
        title: "Your label have been deleted",
      });
      const result = await googleKeepApi.deleteLabel(label);
      dispatch({
        type: DELETE_LABEL,
        newArrLabel: result.newArrLabels,
        newArrNote: result.newArrNote,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
