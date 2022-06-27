import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "@store/actions/authActions";
import styles from "@styles/layout/navbar.module.css";
import Image from "next/image";

const Navbar = () => {
  // Dispatch and router
  const dispatch = useDispatch();
  const router = useRouter();

  // States
  const { token } = useSelector((state) => state.auth);

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
            <Image src="/images/layout/logo.png" width={100} height={100} />
          </a>
        </Link>
      </div>

      <div className={styles.DesktopNav}>
        <ul>
          <li>
            <Link href="/menu">
              <a className={router.pathname === "/menu" ? styles.Active : null}>
                Menu
              </a>
            </Link>
          </li>

          <li>
            <Link href="/reservation">
              <a
                className={
                  router.pathname === "/reservation" ? styles.Active : null
                }
              >
                Reservation
              </a>
            </Link>
          </li>

          <li>
            <Link href="/dashboard">
              <a
                className={
                  router.pathname === "/dashboard" ? styles.Active : null
                }
              >
                Dashboard
              </a>
            </Link>
          </li>

          <li>
            {token ? (
              <Link href="#">
                <a onClick={handleLogout}>Log Out</a>
              </Link>
            ) : (
              <Link href="/register">
                <a
                  className={
                    router.pathname === "/register" ? styles.Active : null
                  }
                >
                  Sign up
                </a>
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className={styles.MobileNav}>
        <ul>
          <li>
            {token ? (
              <Link href="#">
                <a onClick={handleLogout}>Log Out</a>
              </Link>
            ) : (
              <Link href="/register">
                <a>Sign up</a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
