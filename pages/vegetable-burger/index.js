import Burger from "@/components/burger/Burger";
import styles from "@styles/burger/burgerPage.module.css";

const VegetableBurger = () => {
  return (
    <div className={styles.BurgerPage}>
      <Burger pattyType='Vegetable' />
    </div>
  );
};

export default VegetableBurger;
