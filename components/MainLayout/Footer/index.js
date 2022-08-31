import styles from "./Footer.module.scss";
import cx from "classnames";

export default function Footer({ children }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="mainFooter" className={cx("footer", styles.mainFooter)}>
      <p className="py-4 text-center">
        H Sky Trading Company © {currentYear}
        <br />
        Web App by{" "}
        <a target="_blank" href="https://talkwithalfred.com">
          Alfred Insights & Consultancy
        </a>
      </p>
    </footer>
  );
}
