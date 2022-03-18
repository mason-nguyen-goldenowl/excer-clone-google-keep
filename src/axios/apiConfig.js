const apiConfig = {
  baseUrl: process.env.REACT_APP_API,
  accessToken: localStorage.getItem("access_token"),
};

export default apiConfig;
