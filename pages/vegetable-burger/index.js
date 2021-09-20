import Burger from "@/components/burger/Burger";
import HeadSection from "@/components/layout/HeadSection";
import styles from "@styles/burger/burgerPage.module.css";

const VegetableBurgerPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valley | Vegetable Burger'
        content='Make your vegetable burger right. Add and remove ingredients as you like.'
        pageURL='https://www.burgervalley.com/vegetable-burger'
      />
      <main className={styles.BurgerPage}>
        <Burger pattyType='Vegetable' />
      </main>
    </>
  );
};

export default VegetableBurgerPage;
