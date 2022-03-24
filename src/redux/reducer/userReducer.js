import {
  LOGGING,
  LOGIN,
  LOG_OUT,
  REQUEST_RESET_PASSWORD,
  SIGN_UP,
} from "../type/userType";

const stateDefaut = {
  user: {},
  isRequest: "",
  signUpSuccess: false,
  isDisableLogginBTN: false,
};

export const UserReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case LOGIN: {
      state.user.full_name = action.fullName;
      state.user.email = action.email;
      state.isLogin = action.isLogin;
      return { ...state };
    }
    case SIGN_UP: {
      state.signUpSuccess = action.signUpSuccess;
      return { ...state };
    }
    case REQUEST_RESET_PASSWORD: {
      state.isRequest = action.isRequest;
      return { ...state };
    }
    case LOGGING: {
      state.isDisableLogginBTN = action.isDisableLogginBTN;
      return { ...state };
    }
    case LOG_OUT: {
      state.user = {};

      return { ...state };
    }
    default:
      return { ...state };
  }
};
