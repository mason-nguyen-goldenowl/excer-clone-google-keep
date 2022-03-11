import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/ConfigStore";
import { ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
