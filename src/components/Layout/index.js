import Navbar from "../Navbar";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <Navbar />
      </nav>
      <main className={styles.container}>{children}</main>
      <footer className={styles.footer}> Footer </footer>
    </div>
  );
};

export default Layout;
