import styles from "./Layout.module.scss";
import Head from "next/head";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Layout = (props) => {
  var user = props.session ? props.session : null;
  var title = props.title ? props.title.trim() : "404";
  return (
    <div id="mainLayout" className={styles.mainLayout}>
      <Head>
        <title>{title + " - HSKY Import Web App"}</title>
      </Head>
      <Navbar session={user} />
      <main id="mainContent" className={styles.mainContent}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
