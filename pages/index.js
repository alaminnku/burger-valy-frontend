import Cards from "@/components/home/Cards";
import Alert from "@/components/layout/Alert";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "@styles/home/homepage.module.css";
import ImageGallery from "@/components/home/ImageGallery";

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

      <ImageGallery />

      <Alert alerts={alerts} />
    </div>
  );
};

export default HomePage;
