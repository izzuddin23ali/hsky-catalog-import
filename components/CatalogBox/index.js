import styles from "./CatalogBox.module.scss";
import cx from "classnames";

export default function CatalogBox(props, { children }) {
  const catalogURL = props.catalogUrl;
  return (
    <div className="row d-flex justify-content-center">
      <div className={cx("col-12 col-md-6", styles.boxContainer)}>
        <div className={styles.contentContainer}>
          <div className="row">
            <div className="col-12">
              <h1>H Sky Catalog</h1>
              <p className="mt-0 pt-0 mb-4">
                Looking to log in to the main catalog website instead?
              </p>
              <a target="_blank" href={catalogURL} className={styles.button}>
                Take me there
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
