import googleKeepApi from "../../axios/googleKeepApi";
import Swal from "sweetalert2";
import { getLabels, updateArrLabel, updateNote } from "../features/noteSlice";
import { GET_LABEL_NAME } from "../type/noteType";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  background: "#000",
  iconColor: "#ffbb00",
  color: "#ffff",
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const getLabelsAction = () => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.getLabels();

      dispatch(getLabels(result.labels));
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
      Toast.fire({
        icon: "info",
        title: "Your label is creating",
      });
      const result = await googleKeepApi.createLabel(label);
      Toast.fire({
        icon: "success",
        title: result.message,
      });
      dispatch(updateArrLabel({ newArrLabel: result.newArrLabel }));
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Create label failed",
      });
    }
  };
};

export const editLabel = (label) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "info",
        title: "Your label is editing",
      });
      const result = await googleKeepApi.editLabel(label);
      Toast.fire({
        icon: "success",
        title: "Your label have been updated",
      });
      dispatch(
        updateNote({
          newArrLabel: result.newArrLabels,
          newArrNote: result.newArrNote,
        })
      );
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Edit Label failed",
      });
    }
  };
};

export const deleteLabel = (label) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "info",
        title: "Your label is deleting",
      });
      const result = await googleKeepApi.deleteLabel(label);
      Toast.fire({
        icon: "success",
        title: "Your label have been deleted",
      });
      dispatch(
        updateNote({
          newArrLabel: result.newArrLabels,
          newArrNote: result.newArrNote,
        })
      );
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Delete Label failed",
      });
    }
  };
};
