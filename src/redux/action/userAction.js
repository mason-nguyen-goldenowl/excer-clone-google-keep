import googleKeepApi from "../../axios/googleKeepApi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { serviceWorker } from "../../serviceWorker";
import { logging } from "../features/userSlice";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const loginAction = (user, setIsDisable) => {
  return async (dispatch) => {
    try {
      serviceWorker();
      const result = await googleKeepApi.login(user);
      dispatch(logging({ isDisableLogginBTN: false }));

      await Cookies.set("refresh_token", result.refreshToken, {
        expires: 7,
      });
      await Cookies.set("isLogged", true, { expires: 1 });

      localStorage.setItem("access_token", result.accessToken);
    } catch (error) {
      dispatch(logging({ isDisableLogginBTN: false }));
      Toast.fire({
        icon: "error",
        title: "Please check your information",
      });
    }
  };
};

export const signUp = (user) => {
  return async (dispatch) => {
    try {
      await googleKeepApi.signUp(user);
      dispatch(signUp({ signUpSuccess: true }));

      Toast.fire({
        icon: "success",
        title: "Sign up successed",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response.data,
      });
    }
  };
};

export const requestResetPassword = (user) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "info",
        title: "Request reset password is loading",
      });
      await googleKeepApi.requestResetPassword(user);
      dispatch(requestResetPassword({ isRequest: true }));

      Toast.fire({
        icon: "success",
        title: "Request reset password successed",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Please check your email or you have requested",
      });
    }
  };
};

export const resetPassword = (user) => {
  return async (dispatch) => {
    try {
      Toast.fire({
        icon: "info",
        title: "System is reseting your password",
      });
      await googleKeepApi.resetPassword(user);
      dispatch(requestResetPassword({ isRequest: false }));

      Toast.fire({
        icon: "success",
        title: "Reset password successed",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Please check your email and secret code",
      });
    }
  };
};
