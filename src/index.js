import React from "react";
import Swal from "sweetalert2";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-start",
  showConfirmButton: false,
  timer: 3000,
  background: "#000",
  margin: "20px ",
  width: "500px",
  iconColor: "#ffbb00",
  color: "#ffff",
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();

  if (permission !== "granted") {
    Toast.fire({
      icon: "warning",
      title: "Your should allow notification to use remind feature",
    });
  }
};

requestNotificationPermission();

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
