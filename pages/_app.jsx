import Layout from "../components/layout";
import "bootstrap/dist/css/bootstrap.css";
import "leaflet/dist/leaflet.css";
import "../styles.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </>
  );
}
