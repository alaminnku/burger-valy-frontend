import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { useSelector } from "react-redux";
import { MdRestaurantMenu, MdAccountBox } from "react-icons/md";
import styles from "@styles/layout/mobileNav.module.css";

const MobileNav = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className={styles.MobileNav}>
      <div className={styles.Item}>
        <Link href='/'>
          <a>
            <HiHome className={styles.Icon} />
            <p>Home</p>
          </a>
        </Link>
      </div>

      <div className={styles.Item}>
        <Link href='/menu'>
          <a>
            <MdRestaurantMenu className={styles.Icon} />
            <p>Menu</p>
          </a>
        </Link>
      </div>

      <div className={styles.Item}>
        <Link href={token ? "/account" : "/login"}>
          <a>
            <MdAccountBox className={styles.Icon} />
            <p>Account</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
