import Burger from "@/components/burger/Burger";
import styles from "@styles/burger/burgerPage.module.css";

const ChickenBurger = () => {
  return (
    <div className={styles.BurgerPage}>
      <Burger pattyType='Chicken' />
    </div>
  );
};

export default ChickenBurger;
