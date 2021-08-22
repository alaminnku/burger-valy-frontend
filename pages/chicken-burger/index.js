import Burger from "@/components/burger/Burger";
import styles from "@styles/burger/burgerPage.module.css";

const ChickenBurgerPage = () => {
  return (
    <div className={styles.BurgerPage}>
      <Burger pattyType="Chicken" />
    </div>
  );
};

export default ChickenBurgerPage;
