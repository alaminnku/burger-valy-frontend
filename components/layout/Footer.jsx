import { HiHome } from "react-icons/hi";
import { RiBuilding2Fill } from "react-icons/ri";
import { MdAccountBox } from "react-icons/md";
import Link from "next/link";
import { useSelector } from "react-redux";

import styles from "@styles/layout/footer.module.css";

const Footer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <footer className={styles.Footer}>
      <div className={styles.Item}>
        <Link href='/'>
          <a>
            <HiHome />
            <p>Home</p>
          </a>
        </Link>
      </div>
      <div className={styles.Item}>
        <Link href='/build-burger'>
          <a>
            <RiBuilding2Fill />
            <p>Build</p>
          </a>
        </Link>
      </div>

      <div className={styles.Item}>
        <Link href={isAuthenticated ? "/account" : "/login"}>
          <a>
            <MdAccountBox />
            <p>Account</p>
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
