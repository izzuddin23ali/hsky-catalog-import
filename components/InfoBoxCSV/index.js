import styles from "./InfoBoxCSV.module.scss";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function InfoBoxCSV(props, { children }) {
  var rowsAmount = props.data.rowsAmount;
  var columns = props.data.columns;
  var rows = props.data.rows;
  var inCols = props.valid;
  const validCols = inCols.map((each) => {
    return each.toLowerCase();
  });
  return (
    <div className="row d-flex justify-content-center">
      <div className={cx("col-12", styles.boxContainer)}>
        <div className={styles.contentContainer}>
          <div className="row">
            <div className="col-12">
              <h4 className="mb-4">CSV Info</h4>

              <div className="rowsAmount">
                <h6 className={styles.infoHeading}>No. of rows</h6>
                <p className={styles.infoContent}>{rowsAmount}</p>
              </div>

              <div className="columnsInfo mb-4">
                <h6 className={styles.infoHeading}>Columns</h6>
                <div className={styles.columnsContainer}>
                  <table>
                    <thead>
                      <tr>
                        <th>Column Name</th>
                        <th>Valid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {columns.map((eachCol, index) => (
                        <tr key={index}>
                          <th>{eachCol}</th>
                          {validCols.includes(eachCol.toLowerCase()) ? (
                            <td className={styles.valid}>
                              <FontAwesomeIcon icon={faCheck} />
                            </td>
                          ) : (
                            <td className={styles.invalid}>
                              <FontAwesomeIcon icon={faXmark} />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dataPreview">
                <h6 className={styles.infoHeading}>Data Preview</h6>
                <div className={styles.tableContainer}>
                  <table>
                    <thead>
                      <tr>
                        {columns.map((eachCol, index) => (
                          <th key={index}>{eachCol}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((eachCol, colIndex) => (
                            <td key={colIndex}>{row[eachCol]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
