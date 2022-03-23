import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};
const serviceWorker = () => {
  requestNotificationPermission().then(async (reuslt) => {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    await navigator.serviceWorker.register(swUrl);
  });
};

serviceWorker();
ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
