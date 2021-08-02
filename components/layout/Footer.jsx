import { HiHome } from "react-icons/hi";
import { RiBuilding2Fill } from "react-icons/ri";
import { MdAccountBox } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "@styles/layout/footer.module.css";

const Footer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <footer className={styles.Footer}>
      <div className={styles.MobileFooter}>
        <div className={styles.Item}>
          <Link href='/'>
            <a>
              <HiHome className={styles.Icon} />
              <p>Home</p>
            </a>
          </Link>
        </div>
        <div className={styles.Item}>
          <Link href='/build-burger'>
            <a>
              <RiBuilding2Fill className={styles.Icon} />
              <p>Build</p>
            </a>
          </Link>
        </div>

        <div className={styles.Item}>
          <Link href={isAuthenticated ? "/account" : "/login"}>
            <a>
              <MdAccountBox className={styles.Icon} />
              <p>Account</p>
            </a>
          </Link>
        </div>
      </div>

      <div className={styles.DesktopFooter}>
        <div>
          <Link href='/'>
            <a>
              <Image src='/images/layout/logo.svg' width={64} height={64} />
            </a>
          </Link>
        </div>
        <div className={styles.Items}>
          <div className={styles.Item}>
            <p>Menu</p>
            <ul>
              <li>
                <Link href='/beef-burger'>
                  <a>Beef Burger</a>
                </Link>
              </li>
              <li>
                <Link href='/chicken-burger'>
                  <a>Chicken Burger</a>
                </Link>
              </li>
              <li>
                <Link href='/cheese-burger'>
                  <a>Cheese Burger</a>
                </Link>
              </li>
              <li>
                <Link href='/vegetable-burger'>
                  <a>Vegetable Burger</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.Item}>
            <p>Company</p>
            <ul>
              <li>
                <Link href='/find-us'>
                  <a>Find Us</a>
                </Link>
              </li>
              <li>
                <Link href='/about-us'>
                  <a>About Us</a>
                </Link>
              </li>
              <li>
                <Link href='/contact-us'>
                  <a>Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.Item}>
            <p>Address</p>
            <small>Thompson Street 75, New York City, NY 10012. USA</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
