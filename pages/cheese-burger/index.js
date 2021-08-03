import Burger from "@/components/burger/Burger";
import styles from "@styles/burger/burgerPage.module.css";

const CheeseBurger = () => {
  return (
    <div className={styles.BurgerPage}>
      <Burger pattyType='Cheddar' />
    </div>
  );
};

export default CheeseBurger;
