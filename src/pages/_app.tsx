import { ChakraProvider } from "@chakra-ui/react";
import "../../public/fonts/canela/canela.css";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/600.css";

import theme from "../theme";
import { AppProps } from "next/app";

import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    LogRocket.init("xjwz8l/entro-web");
    setupLogRocketReact(LogRocket);
  }

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
