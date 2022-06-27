import Cards from "@/components/home/Cards";
import Alert from "@/components/layout/Alert";
import { useSelector } from "react-redux";
import styles from "@styles/home/homepage.module.css";
import ImageGallery from "@/components/home/ImageGallery";
import ReservationForm from "@/components/reservation/ReservationForm";
import PopularItems from "@/components/home/PopularItems";
import HeadSection from "@/components/layout/HeadSection";

const HomePage = () => {
  // State
  const alerts = useSelector((state) => state.alerts);

  return (
    <>
      <HeadSection
        title="Best Quality Burgers and Fast Foods in Khulna - Burger Valy"
        content="Make, order and pickup your foods in just 30 minutes."
        pageURL="https://www.burgervaly.com/"
        ogImage="https://www.burgervaly.com/images/home/burger.jpg"
      />

      <main className={styles.HomePage}>
        <div className={styles.Title}>
          <h2>Create custom burgers</h2>
          <p>
            Create a custom burger with the ingredients of your preference,
            order online and pickup in 30 minutes
          </p>
        </div>
        <Cards />

        <div className={styles.Title}>
          <h2>Image gallery</h2>
          <p>
            Visit our restaurant to enjoy quality foods in a foodie environment
          </p>
        </div>

        <div className={styles.ImageGallery}>
          <ImageGallery />
        </div>

        <div className={styles.ReservationForm}>
          <div className={styles.Title}>
            <h2>Reserve a Table</h2>
            <p>Book a table to enjoy foods together with friends and family</p>
          </div>

          <div className={styles.Form}>
            <ReservationForm />
          </div>
        </div>

        <PopularItems />

        <Alert alerts={alerts} />
      </main>
    </>
  );
};

export default HomePage;
