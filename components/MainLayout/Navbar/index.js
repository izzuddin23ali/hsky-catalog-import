import styles from "./Navbar.module.scss";
import cx from "classnames";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function Header({ children }) {
  const expand = "md";
  return (
    <>
      <Navbar key={expand} expand={expand} className={styles.mainNav}>
        <div className="container">
          <div className={styles.navBrand}>
            <Link href="/">
              <a>
                <Image
                  src="/static/images/hksy-logo-1.png"
                  quality="100"
                  width="120"
                  height="37"
                  layout="fixed"
                />
              </a>
            </Link>
          </div>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className={cx(
                  "justify-content-start d-flex align-items-center flex-grow-1 pe-3",
                  styles.navContent
                )}
              >
                <Link href="/">
                  <a>Home</a>
                </Link>
              </Nav>
              <Nav
                className={cx(
                  "justify-content-end flex-grow-1 pe-3",
                  styles.navUser
                )}
              >
                <Link href="/#">
                  <a
                    className={cx(
                      "d-inline-flex",
                      styles.userDropdown,
                      styles.loggedOut
                    )}
                  >
                    <span className={styles.user}>Not logged in</span>
                    <FontAwesomeIcon icon={faCircleUser} />
                  </a>
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </div>
      </Navbar>
    </>
  );
}
