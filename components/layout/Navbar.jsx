import Image from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "@store/actions/authActions";
import styles from "@styles/layout/navbar.module.css";

const Navbar = () => {
  // States
  const user = useSelector((state) => state.auth.user);

  // Dispatch and router
  const dispatch = useDispatch();
  const router = useRouter();

  // Logout the user
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className={styles.Navbar}>
      <div className={styles.Logo}>
        <Link href="/">
          <a>
            <h3>Burger Valley</h3>
          </a>
        </Link>
      </div>

      <div className={styles.DesktopNav}>
        <ul>
          <li>
            <Link href="/menu">
              <a className={router.pathname === "/menu" ? styles.Active : ""}>
                Menu
              </a>
            </Link>
          </li>
          <li>
            <Link href="/account">
              <a
                className={router.pathname === "/account" ? styles.Active : ""}
              >
                Account
              </a>
            </Link>
          </li>

          <li>
            {user ? (
              <Link href="#">
                <a onClick={handleLogout}>Log Out</a>
              </Link>
            ) : (
              <Link href="/register">
                <a>Sign Up</a>
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className={styles.MobileNav}>
        <ul>
          <li>
            {user ? (
              <Link href="#">
                <a onClick={handleLogout}>Log Out</a>
              </Link>
            ) : (
              <Link href="/register">
                <a>Sign Up</a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
