import Link from "next/link";
import styles from "@styles/layout/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Content}>
        <div className={styles.AboutUs}>
          <h4>About Us</h4>
          <small>
            We are a small restaurant trying to deliver the best quality food
            possible. We love cooking delicious foods for you. Everyday we get
            inspired seeing the delightful faces of our customers when they try
            our foods.
          </small>
        </div>

        <div className={styles.Info}>
          <div className={styles.OpeningHours}>
            <h4>Opening Hours</h4>
            <p>Saturday-Thursday</p>
            <small>10am-10pm</small>
          </div>

          <div className={styles.ContactInfo}>
            <h4>Contact Info</h4>
            <div className={styles.Item}>
              <p>Address:</p>
              <small>
                68/5 Dorga Road, Opposite of Lions School <br /> Khulna,
                Bangladesh
              </small>
            </div>

            <div className={styles.Item}>
              <p>Phone:</p>
              <a href='tel:01701022532'>+880 17011 022 532</a>
            </div>

            <div className={styles.Item}>
              <p>Email:</p>
              <a href='mailto: info@burgervalley.com'>info@burgervalley.com</a>
            </div>
          </div>
        </div>

        <div className={styles.QuickLinks}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link href='/menu'>Menu</Link>
            </li>
            <li>
              <Link href='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link href='/reservation'>Reservation</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.Copyright}>
        <small>Copyright &copy; 2021 All rights reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
