import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isRequest: "",
    signUpSuccess: false,
    isDisableLogginBTN: false,
  },
  reducers: {
    signUp(state, action) {
      state.signUpSuccess = action.payload.signUpSuccess;
    },
    requestResetPassword(state, action) {
      state.isRequest = action.payload.isRequest;
    },
    logging(state, action) {
      console.log(action.payload);
      state.isDisableLogginBTN = action.payload.isDisableLogginBTN;
    },
  },
});

export const selectUsers = (state) => state.users;
export const { signUp, requestResetPassword, logging } = userSlice.actions;
export default userSlice.reducer;
