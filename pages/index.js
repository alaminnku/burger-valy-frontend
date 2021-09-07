import Cards from "@/components/home/Cards";
import Alert from "@/components/layout/Alert";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "@styles/home/homepage.module.css";

const HomePage = () => {
  const alerts = useSelector((state) => state.alerts);

  return (
    <div className={styles.HomePage}>
      <div className={styles.Title}>
        <h2>Design Your Burger, Order and Pickup in 30 Minutes!</h2>
        <small>
          Make the burger exactly as your taste! Choose what you like and how
          much of it!
        </small>
      </div>
      <Cards />

      <div className={styles.Title}>
        <h2>Enjoy Delicious Foods on Table!</h2>
        <small>
          Visit our restaurant and enjoy your meals in a foodie environment!
        </small>
      </div>

      <div className={styles.Image}>
        <Image
          src='/images/home/interior.jpg'
          width='1024'
          height='576'
          layout='responsive'
        />
      </div>

      <div className={styles.CTA}>
        <h4>Placed an Order or Want to Place One?</h4>
        <a href='tel:+18475555555'>Give us a call: +1-847-555-5555</a>
      </div>
      <Alert alerts={alerts} />
    </div>
  );
};

export default HomePage;
