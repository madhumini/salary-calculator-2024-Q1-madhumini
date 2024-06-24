"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import GlobalStyle from "@/src/globalstyles";
import { ThemeProvider, type DefaultTheme } from "styled-components";


const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};
const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
