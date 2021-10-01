import Burger from "@/components/burger/Burger";
import HeadSection from "@/components/layout/HeadSection";
import styles from "@styles/burger/burgerPage.module.css";

const CheeseBurgerPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valy | Cheese Burger'
        content='Make your cheese burger right. Add and remove ingredients as you like.'
        pageURL='https://www.burgervaly.com/cheese-burger'
      />
      <main className={styles.BurgerPage}>
        <Burger pattyType='Cheddar' />
      </main>
    </>
  );
};

export default CheeseBurgerPage;
