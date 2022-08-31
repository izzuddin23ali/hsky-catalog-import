import "../styles/app.scss";
import SSRProvider from "react-bootstrap/SSRProvider";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <NextNProgress
        color="#00ccf5"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default MyApp;
