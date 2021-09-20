import Burger from "@/components/burger/Burger";
import HeadSection from "@/components/layout/HeadSection";
import styles from "@styles/burger/burgerPage.module.css";

const ChickenBurgerPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valley | Chicken Burger'
        content='Make your chicken burger right. Add and remove ingredients as you like.'
        pageURL='https://www.burgervalley.com/chicken-burger'
      />
      <main className={styles.BurgerPage}>
        <Burger pattyType='Chicken' />
      </main>
    </>
  );
};

export default ChickenBurgerPage;
