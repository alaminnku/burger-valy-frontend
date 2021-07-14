import { HiHome } from "react-icons/hi";
import { RiBuilding2Fill } from "react-icons/ri";
import { MdAccountBox } from "react-icons/md";
import Link from "next/link";

import styles from "@styles/layout/footer.module.css";

const Footer = () => {
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
        <Link href='/login'>
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
