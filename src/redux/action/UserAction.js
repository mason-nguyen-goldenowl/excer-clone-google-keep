import googleKeepApi from "../../axios/googleKeepApi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { LOGIN, REQUEST_RESET_PASSWORD, SIGN_UP } from "../type/UserType";

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

export const loginAction = (user) => {
  return async (dispatch) => {
    try {
      const result = await googleKeepApi.login(user);

      await Cookies.set("refresh_token", result.refreshToken, {
        expires: 7,
      });
      await Cookies.set("isLogged", true, { expires: 1 });

      localStorage.setItem("access_token", result.accessToken);

      await dispatch({
        type: LOGIN,
        fullName: result.userFname,
        email: result.email,
      });
    } catch (error) {
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
      const result = await googleKeepApi.signUp(user);
      dispatch({
        type: SIGN_UP,
        signUpSuccess: true,
      });
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
      const result = await googleKeepApi.requestResetPassword(user);
      dispatch({
        type: REQUEST_RESET_PASSWORD,
        isRequest: true,
      });
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
      const result = await googleKeepApi.resetPassword(user);
      dispatch({
        type: REQUEST_RESET_PASSWORD,
        isRequest: false,
      });
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