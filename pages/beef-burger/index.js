import Burger from "@/components/burger/Burger";
import styles from "@styles/burger/burgerPage.module.css";

const BeefBurger = () => {
  return (
    <div className={styles.BurgerPage}>
      <Burger pattyType='Beef' />
    </div>
  );
};

export default BeefBurger;
