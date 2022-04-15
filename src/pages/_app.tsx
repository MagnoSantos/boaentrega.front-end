import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import VerifyEmail from "~/components/VerifyEmail";
import { useUser } from "~/hooks/useUser";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { user, isLoading } = useUser();
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>Boa Entrega</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider>
        <Flex minH="100vh" direction="column">
          <Header />
          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
