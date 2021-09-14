import Cards from "@/components/home/Cards";
import Alert from "@/components/layout/Alert";
import { useSelector } from "react-redux";
import styles from "@styles/home/homepage.module.css";
import ImageGallery from "@/components/home/ImageGallery";
import ReservationForm from "@/components/reservation/ReservationForm";
import PopularItems from "@/components/home/PopularItems";

const HomePage = () => {
  const alerts = useSelector((state) => state.alerts);

  return (
    <div className={styles.HomePage}>
      <div className={styles.Title}>
        <h2>Make Your Burger</h2>
        <small>
          Choose the ingredients and make the burger. Order online and pickup in
          30 minutes!
        </small>
      </div>
      <Cards />

      <div className={styles.Title}>
        <h2>Delicious Foods on Table!</h2>
        <small>
          Visit our restaurant and enjoy foods in a foodie environment!
        </small>
      </div>

      <div className={styles.ImageGallery}>
        <ImageGallery />
      </div>

      <div className={styles.ReservationForm}>
        <div className={styles.Title}>
          <h2>Reserve a Table</h2>
          <small>
            Reserve a table and enjoy foods with your friends and family!
          </small>
        </div>

        <div className={styles.Form}>
          <ReservationForm
            style={{
              borderRadius: ".5rem",
              borderTop: "1.5px solid var(--borderColor)",
            }}
          />
        </div>
      </div>

      <PopularItems />

      <Alert alerts={alerts} />
    </div>
  );
};

export default HomePage;
