import Image from "next/image";
import styles from "@styles/layout/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <Image src='/images/layout/logo.svg' width={64} height={64} />
    </nav>
  );
};

export default Navbar;
