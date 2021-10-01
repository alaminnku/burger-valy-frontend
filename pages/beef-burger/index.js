import Burger from "@/components/burger/Burger";
import HeadSection from "@/components/layout/HeadSection";
import styles from "@styles/burger/burgerPage.module.css";

const BeefBurgerPage = () => {
  return (
    <>
      <HeadSection
        title='Burger Valy | Beef Burger'
        content='Make your beef burger right. Add and remove ingredients as you like.'
        pageURL='https://www.burgervaly.com/beef-burger'
      />
      <main className={styles.BurgerPage}>
        <Burger pattyType='Beef' />
      </main>
    </>
  );
};

export default BeefBurgerPage;
