import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { App } from "./app/App";
import { App as AntdApp } from "antd";
import "./global.less";
import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider, theme } from "antd";
import { generate } from "@ant-design/colors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export const primary = generate("#ad3df5");

const customTheme = {
  token: {
    colorPrimary: primary[5],
    colorPrimaryHover: primary[6],
    colorPrimaryActive: primary[7],
  },
  components: {
    Button: {
      defaultBg: "#f9fafb",
      defaultBorderColor: "#d1d5db",
    },
  },
};

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        ...customTheme,
      }}
    >
      <AntdApp>
        <HashRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </HashRouter>
      </AntdApp>
    </ConfigProvider>
  </QueryClientProvider>,
  document.getElementById("root"),
);
