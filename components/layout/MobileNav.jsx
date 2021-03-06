import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { useSelector } from "react-redux";
import { MdRestaurantMenu, MdAccountBox } from "react-icons/md";
import { GiRoundTable } from "react-icons/gi";
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
        <Link href='/reservation'>
          <a>
            <GiRoundTable className={styles.Icon} />
            <p>Reservation</p>
          </a>
        </Link>
      </div>

      <div className={styles.Item}>
        <Link href={token ? "/dashboard" : "/login"}>
          <a>
            <MdAccountBox className={styles.Icon} />
            <p>Dashboard</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
