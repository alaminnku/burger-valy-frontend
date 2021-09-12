import Link from "next/link";
import styles from "@styles/layout/footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Content}>
        <div className={styles.AboutUs}>
          <h4>About Us</h4>
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
            dolores sint. Pariatur, perferendis vitae ipsum distinctio, alias,
            est blanditiis similique voluptatibus iure incidunt libero
            cupiditate!
          </small>
        </div>

        <div className={styles.Info}>
          <div className={styles.OpeningHours}>
            <h4>Opening Hours</h4>
            <p>Saturday-Friday</p>
            <small>10AM-10PM</small>
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
              <small>+880 17011 022 532</small>
            </div>

            <div className={styles.Item}>
              <p>Email:</p>
              <small>info@burgervalley.com</small>
            </div>
          </div>
        </div>

        <div className={styles.QuickLinks}>
          <h4>Quick Links</h4>
          <ul>
            <li>About</li>
            <li>Menu</li>
            <li>Account</li>
            <li>Reservation</li>
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
