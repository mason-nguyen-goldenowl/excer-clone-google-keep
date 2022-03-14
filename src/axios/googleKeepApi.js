import axiosClient from "./axiosClient";

const googleKeepApi = {
  login: (user) => {
    return axiosClient.post("/auth/login", user);
  },

  signUp: (user) => {
    return axiosClient.post("/auth/signup", user);
  },

  requestResetPassword: (user) => {
    return axiosClient.post("/auth/request-reset-password", user);
  },

  resetPassword: (user) => {
    return axiosClient.post("/auth/reset-password", user);
  },

  refreshAccessToken: (refresh) => {
    return axiosClient.post("/auth/refresh", refresh);
  },

  getNote: () => {
    return axiosClient.get("/note");
  },

  createNote: (note) => {
    return axiosClient.post("/note/create", note);
  },

  editNote: (note) => {
    return axiosClient.post("/note/edit", note);
  },

  archiveNote: (note) => {
    return axiosClient.put("/note/archive", note);
  },

  deleteNote: (note) => {
    return axiosClient.delete("/note/delete", { data: note });
  },

  cleaerRemind: (note) => {
    return axiosClient.delete("/note/clear-remind", { data: note });
  },

  restoreNote: (note) => {
    return axiosClient.put("/note/restore", note);
  },

  removeNote: (note) => {
    return axiosClient.delete("/note/remove", { data: note });
  },

  getLabels: () => {
    return axiosClient.get("/label");
  },

  createLabel: (label) => {
    return axiosClient.post("/label/create", label);
  },

  editLabel: (label) => {
    return axiosClient.post("/label/edit", label);
  },
  deleteLabel: (label) => {
    return axiosClient.delete("/label/delete", { data: label });
  },
  emptyTrash: () => {
    return axiosClient.delete("/note/empty");
  },
};

export default googleKeepApi;
